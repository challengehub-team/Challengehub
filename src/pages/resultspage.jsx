import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-red-600">
                        No Result Found
                    </h2>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const whatsappNumber = "2348012345678"; // CHANGE TO YOUR NUMBER

    const message = `
📚 EXAM RESULT

👤 Name: ${state.name}

✅ Score: ${state.score}/${state.total}

📊 Percentage: ${state.percent}%

⚠️ Warnings: ${state.warnings}

⏱ Time Used: ${state.timeUsed} seconds
`;

    const sendToWhatsApp = () => {
        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                message
            )}`,
            "_blank"
        );
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-5">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8">

                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-700">
                        Exam Result
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Your examination has been submitted successfully
                    </p>
                </div>

                <div className="mt-8 space-y-4">

                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold">Candidate</p>
                        <p>{state.name}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold">Score</p>
                        <p>
                            {state.score} / {state.total}
                        </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold">Percentage</p>
                        <p>{state.percent}%</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold">Warnings</p>
                        <p>{state.warnings}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold">Time Used</p>
                        <p>{state.timeUsed} seconds</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">

                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-200 py-3 rounded-lg font-semibold"
                    >
                        Home
                    </button>

                    <button
                        onClick={sendToWhatsApp}
                        className="bg-green-600 text-white py-3 rounded-lg font-semibold"
                    >
                        Send To WhatsApp
                    </button>

                </div>
            </div>
        </div>
    );
}