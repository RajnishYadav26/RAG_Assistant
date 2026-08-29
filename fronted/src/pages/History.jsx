import { useState } from "react";

import {
  Search,
  MessageSquare,
  Clock,
} from "lucide-react";

import "./History.css";

function History() {

  const [search, setSearch] =
    useState("");

  const conversations = [
    {
      id: 1,
      title: "What is the company leave policy?",
      preview:
        "According to the company policy...",
      date: "Today",
    },
    {
      id: 2,
      title: "Explain the project architecture",
      preview:
        "The project consists of several...",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "What are the security requirements?",
      preview:
        "The security requirements include...",
      date: "Aug 25, 2026",
    },
  ];

  const filtered =
    conversations.filter((conversation) =>
      conversation.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="history-page">

      <div className="history-header">

        <div>
          <h1>Chat History</h1>

          <p>
            View your previous conversations.
          </p>
        </div>

      </div>


      <div className="history-content">

        <div className="history-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        <div className="history-list">

          {filtered.length === 0 ? (

            <div className="history-empty">

              <MessageSquare size={28} />

              <h2>
                No conversations found
              </h2>

              <p>
                Try a different search.
              </p>

            </div>

          ) : (

            filtered.map((conversation) => (

              <div
                className="history-item"
                key={conversation.id}
              >

                <div className="history-icon">
                  <MessageSquare size={19} />
                </div>


                <div className="history-info">

                  <h3>
                    {conversation.title}
                  </h3>

                  <p>
                    {conversation.preview}
                  </p>

                </div>


                <div className="history-date">

                  <Clock size={13} />

                  {conversation.date}

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default History;