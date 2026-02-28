"use client";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GatewayProps {
  amount: number;
  products: string;
  userId: string;
  token: string;
  onSuccess?: () => void;    // called BEFORE redirect (use to save cart snapshot)
  onCancel?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateUUID(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

// ══════════════════════════════════════════════════════════════════════════════
//  eSewa Gateway
//  Flow: frontend fetches HMAC signature from backend → submits hidden form
//        → eSewa redirects to /auth/payment-success on success
// ══════════════════════════════════════════════════════════════════════════════
export function EsewaGateway({ amount, products, userId, token, onSuccess }: GatewayProps) {

  const handleEsewa = async () => {
    const transaction_uuid = generateUUID();
    const product_code    = "EPAYTEST";
    const total_amount    = amount;

    // 1. Get HMAC signature from backend (secret key stays server-side)
    const sigRes = await fetch("http://localhost:5050/api/payment/esewa/signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total_amount, transaction_uuid, product_code }),
    });
    const { signature } = await sigRes.json();

    // 2. Save cart snapshot + payment metadata BEFORE leaving the page
    const pendingItems = localStorage.getItem("pendingOrderItems");
    const pendingTotal = localStorage.getItem("pendingOrderTotal");
    localStorage.setItem("paymentMethod", "esewa");
    localStorage.setItem("paymentAmount", String(amount));
    localStorage.setItem("paymentProduct", products);
    localStorage.setItem("paymentUserId", userId);
    localStorage.setItem("esewaTransactionUUID", transaction_uuid);

    // 3. Build and auto-submit the form to eSewa
    const form = document.createElement("form");
    form.method  = "POST";
    form.action  = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    form.style.display = "none";

    const fields: Record<string, string> = {
      amount:                    String(total_amount),
      tax_amount:                "0",
      total_amount:              String(total_amount),
      transaction_uuid:          transaction_uuid,
      product_code:              product_code,
      product_service_charge:    "0",
      product_delivery_charge:   "0",
      success_url:               `${window.location.origin}/auth/payment-success`,
      failure_url:               `${window.location.origin}/auth/payment-failure`,
      signed_field_names:        "total_amount,transaction_uuid,product_code",
      signature:                 signature,
    };

    for (const [name, value] of Object.entries(fields)) {
      const input    = document.createElement("input");
      input.type     = "hidden";
      input.name     = name;
      input.value    = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    onSuccess?.(); // ✅ save cart snapshot before leaving the page
    form.submit();
  };

  return (
    <button
      onClick={handleEsewa}
      className="flex items-center gap-2.5 bg-[#37c83b] hover:bg-[#2db531] text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
    >
      <EsewaLogo />
      Pay with eSewa
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  Khalti Gateway
//  Flow: frontend calls backend → backend calls Khalti API with secret key
//        → backend returns payment_url → frontend redirects user
//        → Khalti redirects to /auth/payment-success?pidx=...
// ══════════════════════════════════════════════════════════════════════════════
export function KhaltiGateway({ amount, products, userId, token, onSuccess }: GatewayProps) {

  const handleKhalti = async () => {
    const orderId = generateUUID();

    // Save cart snapshot + metadata BEFORE leaving the page
    localStorage.setItem("paymentMethod", "khalti");
    localStorage.setItem("paymentAmount", String(amount));
    localStorage.setItem("paymentProduct", products);
    localStorage.setItem("paymentUserId", userId);

    // 1. Ask backend to initiate with Khalti (secret key stays server-side)
    const res = await fetch("http://localhost:5050/api/payment/khalti/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        productName: products,
        orderId,
      }),
    });

    if (!res.ok) {
      alert("Failed to initiate Khalti payment. Please try again.");
      return;
    }

    const data = await res.json();

    // 2. Redirect user to Khalti's payment page
    if (data.payment_url) {
      onSuccess?.(); // ✅ save cart snapshot before leaving the page
      window.location.href = data.payment_url;
    }
  };

  return (
    <button
      onClick={handleKhalti}
      className="flex items-center gap-2.5 bg-[#5c2d91] hover:bg-[#4a2475] text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(92,45,145,0.4)]"
    >
      <KhaltiLogo />
      Pay with Khalti
    </button>
  );
}

// ─── SVG Logos ────────────────────────────────────────────────────────────────
function EsewaLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.25)" />
      <text x="7" y="28" fontSize="20" fontWeight="900" fill="#fff" fontFamily="Arial">e</text>
    </svg>
  );
}

function KhaltiLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.2)" />
      <text x="7" y="28" fontSize="18" fontWeight="900" fill="#fff" fontFamily="Arial">K</text>
    </svg>
  );
}