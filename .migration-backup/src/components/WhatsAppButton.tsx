"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918396977520"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: 9999,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#25D366",
        color: "white",
        fontSize: "26px",
        textDecoration: "none",
      }}
    >
      <span>✆</span>
    </a>
  );
}