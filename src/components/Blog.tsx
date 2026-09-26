import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Data Visualization in Business Intelligence",
      excerpt: "Exploring how modern data visualization techniques are transforming business intelligence and decision-making processes.",
      date: "May 15, 2023",
      author: "Morshedur Rahman Khan",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Data Visualization"
    },
    {
      title: "Effective IT Management Strategies for Remote Teams",
      excerpt: "Key strategies and best practices for managing IT operations with distributed teams across different time zones.",
      date: "April 3, 2023",
      author: "Morshedur Rahman Khan",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "IT Management"
    },
    {
      title: "Research Methodologies in Information Technology",
      excerpt: "A comprehensive guide to research approaches and methodologies specifically tailored for IT and data science projects.",
      date: "March 12, 2023",
      author: "Morshedur Rahman Khan",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Research"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Blog & Insights</h2>
          <div className="mt-2 w-20 h-1 bg-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Sharing knowledge and insights on data visualization, IT management, and research methodologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500 text-sm">
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <a href="#" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors duration-200">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 inline-flex items-center"
          >
            View All Posts <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;