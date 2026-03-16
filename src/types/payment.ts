/**
 * Payment types — Stripe-ready for future checkout flow.
 */

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export interface PaymentIntentMetadata {
  bookingId?: string;
  userId?: string;
  businessId?: string;
  type?: "reservation" | "booking" | "subscription";
}

export interface PaymentRecord {
  id: string;
  amount: number;        // cents
  currency: string;
  status: PaymentStatus;
  metadata: PaymentIntentMetadata;
  createdAt: Date;
}
