import React, { useState, FormEvent } from "react";
import { CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { STRINGS } from "@/constants/strings";

type ContactFormProps = {
  toEmail?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({
  toEmail = STRINGS.CONTACT_EMAIL,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = "August Daycare Inquiry";
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Message:",
      message,
    ];

    const body = bodyLines.join("\n");

    const mailtoLink = `mailto:${encodeURIComponent(
      toEmail
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Step 1: Show loading screen
    setLoading(true);

    // Step 2: After a short delay, show the confirmation message and open mail app
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Open the user's email client
      window.location.href = mailtoLink;
    }, 800); // smooth 0.8s transition
  };

  return (
    <CardContent>
      {loading ? (
        // -------------------
        // LOADING SCREEN
        // -------------------
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-slate-600">
            Preparing your email…
          </p>
        </div>
      ) : submitted ? (
        // -------------------
        // SUBMITTED SCREEN
        // -------------------
        <div className="space-y-3 py-4">
          <h3 className="text-lg font-semibold">Check your email app ✉️</h3>
          <p className="text-sm text-slate-600">
            We’ve opened your default email application with your message
            pre-filled. Just review it and press send.
          </p>
          <p className="text-sm text-slate-600">
            If your email app didn’t open, you can email us directly at{" "}
            <a
              href={`mailto:${toEmail}`}
              className="font-semibold text-primary underline"
            >
              {toEmail}
            </a>
            .
          </p>
          <Button
            type="button"
            className="rounded-xl"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setPhone("");
              setMessage("");
            }}
          >
            Go back
          </Button>
        </div>
      ) : (
        // -------------------
        // ORIGINAL FORM
        // -------------------
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Your name"
              required
              className="w-full rounded-xl border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              required
              className="w-full rounded-xl border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            placeholder="Phone"
            className="w-full rounded-xl border px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="How can we help?"
            rows={5}
            className="w-full rounded-xl border px-3 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button type="submit" className="rounded-xl">
            Submit
          </Button>
        </form>
      )}
    </CardContent>
  );
};

export default ContactForm;