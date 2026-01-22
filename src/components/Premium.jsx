import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Loader2, Crown, Sparkles } from "lucide-react";
import { BASE_URL } from "../utils/constant";

const plans = [
  {
    id: "silver",
    name: "Silver Builder",
    price: "₹299",
    duration: "3 Months",
    accent: "from-gray-300 to-gray-100",
    perks: [
      "10 connection requests / day",
      "Limited Superlikes",
      "Silver profile badge",
      "Basic feed priority",
    ],
  },
  {
    id: "gold",
    name: "Gold Creator",
    price: "₹699",
    duration: "6 Months",
    featured: true,
    accent: "from-yellow-400 to-amber-500",
    perks: [
      "Unlimited connection requests",
      "Unlimited Superlikes",
      "Verified blue tick",
      "High feed priority",
      "See profile viewers",
    ],
  },
];

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      setCheckingStatus(true);
      const res = await axios.get(`${BASE_URL}/premium/verify`, {
        withCredentials: true,
      });
      setIsPremium(res.data.isPremium);
    } catch (err) {
      console.error("Verify premium failed", err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleBuy = async (planId) => {
    try {
      setLoadingPlan(planId);

      const res = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: planId },
        { withCredentials: true }
      );

      const { keyId, amount, currency, orderId, notes } = res.data;

      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "Homio",
        description: `${planId.toUpperCase()} Membership`,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
        },
        theme: { color: "#6366F1" },
        handler: () => {
          setTimeout(() => verifyPremiumUser(), 2000);
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <Crown className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-4xl font-bold">You’re Premium 🎉</h1>
        <p className="mt-3 text-gray-600">
          Enjoy all premium features without limits.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20
      bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]">

      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent
          bg-linear-to-r from-indigo-600 to-pink-600">
          Upgrade Your Experience
        </h1>
        <p className="mt-4 text-gray-700 text-lg">
          Serious builders choose premium collaboration
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative rounded-3xl p-8
              bg-white/70 backdrop-blur-xl
              border border-white/40 shadow-xl
              transition transform hover:-translate-y-2
              ${plan.featured ? "ring-2 ring-yellow-400" : ""}
            `}
          >
            {plan.featured && (
              <div className="absolute -top-4 right-6 px-4 py-1
                rounded-full text-sm font-semibold
                bg-linear-to-r from-yellow-400 to-amber-500 text-white">
                ⭐ Most Popular
              </div>
            )}

            <div className="flex items-center gap-3">
              <Sparkles className={`w-6 h-6 ${plan.featured ? "text-yellow-500" : "text-gray-400"}`} />
              <h2 className="text-2xl font-bold">{plan.name}</h2>
            </div>

            <div className="mt-4">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="ml-2 text-gray-600">/ {plan.duration}</span>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.perks.map((perk, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-indigo-500" />
                  {perk}
                </li>
              ))}
            </ul>

            <button
              disabled={loadingPlan === plan.id}
              onClick={() => handleBuy(plan.id)}
              className={`
                mt-8 w-full py-3 rounded-xl font-semibold text-white
                transition hover:scale-105
                ${plan.featured
                  ? "bg-linear-to-r from-yellow-400 to-amber-500"
                  : "bg-indigo-600 hover:bg-indigo-700"}
                disabled:opacity-60
              `}
            >
              {loadingPlan === plan.id ? (
                <Loader2 className="mx-auto animate-spin" />
              ) : (
                "Upgrade Now"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
