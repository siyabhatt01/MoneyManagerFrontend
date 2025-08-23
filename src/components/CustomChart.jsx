const CustomChart = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // full object for that date

    return (
      <div className="bg-white shadow-lg rounded-lg p-3 border text-sm">
        <p className="font-semibold">{new Date(data.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
        <p className="text-purple-600 font-bold">Total: ₹{data.totalAmount.toLocaleString()}</p>
        <p className="font-medium mt-1">Details:</p>
        <ul className="list-disc ml-4">
          {data.items.map((item, idx) => (
            <li key={idx}>
              {item.source}: ₹{item.amount.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};
export default CustomChart;