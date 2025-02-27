import React, { useState } from 'react';

const ExpertDiaries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  const articles = [
    {
      title: "Navigating the Future of Work: Skills You Need to Succeed",
      author: "Jane Doe",
      content: "In today’s rapidly changing job market, staying ahead of the curve is essential. This article explores the top skills that employers are looking for in 2024...",
      tags: ["Career", "Skills", "Future"],
      comments: [],
    },
    {
      title: "From Intern to CEO: My Journey in the Tech Industry",
      author: "John Smith",
      content: "In this personal narrative, John recounts his journey from a summer intern to the CEO of a successful tech startup...",
      tags: ["Career", "Leadership"],
      comments: [],
    },
    {
      title: "The Power of Networking: Building Connections that Matter",
      author: "Emily Chen",
      content: "Emily dives into the art of networking, providing actionable strategies for building meaningful professional relationships...",
      tags: ["Networking", "Career"],
      comments: [],
    },
    {
      title: "Emerging Trends in Data Science: What You Need to Know",
      author: "Dr. Alex Patel",
      content: "In this article, Dr. Patel discusses the latest trends in data science, including the rise of artificial intelligence and machine learning...",
      tags: ["Data Science", "Trends"],
      comments: [],
    },
    {
      title: "The Importance of Emotional Intelligence in Leadership",
      author: "Sarah Lee",
      content: "Emotional intelligence is crucial for effective leadership. This article explores its significance and how to develop it...",
      tags: ["Leadership", "Emotional Intelligence"],
      comments: [],
    },
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleCommentSubmit = (articleIndex, comment) => {
    const newArticles = [...articles];
    newArticles[articleIndex].comments.push(comment);
    // Update state or handle the new articles array as needed
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Expert Diaries</h1>
        <p className="text-lg text-gray-600">Your source for insights and advice from industry leaders.</p>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 p-2 border border-gray-300 rounded w-4/5"
        />
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map((article, index) => (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105" key={index}>
            <h2 className="text-xl font-semibold text-blue-600">{article.title}</h2>
            <h4 className="text-md text-gray-500">By {article.author}</h4>
            <p className="text-gray-700 mt-2">{article.content}</p>
            <div className="mt-2">
              {article.tags.map((tag, i) => (
                <span key={i} className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded mr-1">{tag}</span>
              ))}
            </div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Read More</button>
            <div className="mt-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Share</button>
            </div>
            <div  className="mt-4">
              <h3 className="text-md font-semibold">Comments</h3>
              <ul className="list-disc pl-5">
                {article.comments.map((comment, i) => (
                  <li key={i} className="text-gray-600">{comment}</li>
                ))}
              </ul>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const commentInput = e.target.elements.comment.value;
                  handleCommentSubmit(index, commentInput);
                  e.target.reset();
                }}
                className="mt-2"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                  className="border border-gray-300 rounded p-2 w-full"
                />
                <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit</button>
              </form>
            </div>
          </div>
        ))}
      </main>
      <footer className="mt-6">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ExpertDiaries;