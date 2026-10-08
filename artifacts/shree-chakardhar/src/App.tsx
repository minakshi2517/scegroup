import { useEffect } from "react";
import { Route, Switch, useLocation, useRoute, Router as WouterRouter } from "wouter";
import RootLayout from "@/app/layout";
import HomePage from "@/app/page";
import CarsPage from "@/app/cars/page";
import CarPage from "@/app/cars/[slug]/page";
import BookPage from "@/app/book/page";
import NotFound from "@/app/not-found";
import { getVehicle } from "@/data/vehicles";
import { brand } from "@/data/site";

function CarRoute() {
  const [, params] = useRoute("/cars/:slug");
  if (!params?.slug) return <NotFound />;
  return <CarPage params={{ slug: params.slug }} />;
}

function AppRoutes() {
  const [location] = useLocation();

  useEffect(() => {
    const carMatch = location.match(/^\/cars\/([^/]+)$/);
    const car = carMatch ? getVehicle(decodeURIComponent(carMatch[1])) : undefined;
    const pageTitle = car
      ? `${car.name} ${car.year}`
      : location === "/cars"
        ? "Cars"
        : location === "/book"
          ? "Book"
          : location === "/"
            ? `${brand.name} | Car Rentals in Gurugram`
            : "Page not found";
    document.title = `${pageTitle} · ${brand.short}`;
  }, [location]);

  return (
    <RootLayout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/cars" component={CarsPage} />
        <Route path="/cars/:slug" component={CarRoute} />
        <Route path="/book" component={BookPage} />
        <Route component={NotFound} />
      </Switch>
    </RootLayout>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AppRoutes />
    </WouterRouter>
  );
}

export default App;
