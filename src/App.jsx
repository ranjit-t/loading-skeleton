import React, { useEffect, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [quotes, setQuotes] = useState([""]);
  const [fetchedQuotes, setFetchedQuotes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/getdata");
      const data = await response.json();
      setFetchedQuotes(data);
      console.log(data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(name, quotes);

    try {
      // const formattedQuotes = quotes.map((quote) => ({ quote }));
      const response = await fetch("http://localhost:3000/addNewQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, quotes: quotes }),
      });

      if (response.ok) {
        // File download initiated, handle success if needed
        console.log("data is sent");
      } else {
        // Handle error response if needed
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      // Handle network or fetch error
      console.log("Error:", error.message);
    }

    setName("");
    setQuotes([""]);
    window.location.href = "/";
  };

  const handleQuoteChange = (index, value) => {
    const updatedQuotes = [...quotes];
    updatedQuotes[index] = value;
    setQuotes(updatedQuotes);
  };

  const handleAddQuote = () => {
    setQuotes([...quotes, ""]);
  };

  const handleRemoveQuote = (index) => {
    const updatedQuotes = [...quotes];
    updatedQuotes.splice(index, 1);
    setQuotes(updatedQuotes);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Enter Name and Quotes</h1>
      <form onSubmit={handleFormSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block font-medium mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        {quotes.map((quote, index) => (
          <div key={index} className="mb-4">
            <label className="block font-medium mb-2">
              Quote #{index + 1}:
            </label>
            <textarea
              value={quote}
              onChange={(e) => handleQuoteChange(index, e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            {index === quotes.length - 1 && (
              <button
                type="button"
                onClick={handleAddQuote}
                className="text-sm text-blue-500 hover:text-blue-700 underline mt-1 bg-gray-100 m-2 p-2"
              >
                +
              </button>
            )}
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveQuote(index)}
                className="text-sm text-red-500 hover:text-red-700 underline mt-1 bg-gray-100 m-2 p-2"
              >
                -
              </button>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {fetchedQuotes.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Fetched Quotes:</h2>
          {fetchedQuotes.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="text-xl font-bold">{item.name}</p>
              {item.quotes.map((quote, idx) => {
                return (
                  <div key={idx}>
                    <p>{quote}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
