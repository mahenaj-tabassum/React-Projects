import { useState } from "react";
import QRCode from "react-qr-code";

const QR_Code_Generator = () => {
  // Stores the text or URL that will be converted into a QR code.
  const [qrCode, setQrCode] = useState("");

  // Stores the current value entered by the user in the input field.
  const [input, setInput] = useState("");

  const handleGenerateQRCode = () => {
    // Copies the user's input into qrCode.
    // Updating qrCode causes React to render the QR code with the new value.
    setQrCode(input);

    // Clears the input field after generating the QR code.
    setInput("");
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-zinc-950 via-neutral-950 to-zinc-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/60">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-white tracking-tight">
          QR Code <span className="text-violet-400">Generator</span>
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Type anything and turn it into a QR code
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            // Controlled input: Determines the input's displayed value.
            value={input}
            // Updates the input state whenever the user types or deletes text.
            onChange={(e) => setInput(e.target.value)}
            name="qr-code"
            type="text"
            placeholder="Enter text or URL..."
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
          />
          <button
            // Disables the button when the input is empty.
            disabled={input.trim() === ""}
            // Calls the handler when the user clicks the button.
            onClick={handleGenerateQRCode}
            className="rounded-xl cursor-pointer bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600 disabled:active:scale-100"
          >
            Generate QR Code
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          {/* Displays the generated QR code inside a white container. */}
          <div className="rounded-xl bg-white p-3 shadow-lg shadow-violet-500/10">
            <QRCode
              // Provides an ID to identify this QR code element.
              id="qr-code-value"
              // The library converts this value into a QR code.
              value={qrCode}
              // Sets the QR code's base size to 400 pixels.
              size={400}
              bgColor="#fff"
              // Keeps the QR code responsive while preserving its aspect ratio.
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QR_Code_Generator;
