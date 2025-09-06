import React from 'react';

export default function NewsletterBox() {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-medium text-gray-800 mb-3">Subscribe now & get 20% off</h2>
      <p className="text-gray-500 mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus adipisci saepe ipsum!
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input type="email" placeholder="Enter your email" className="w-full sm:full-1 ouline-none" required />
        <button type='submit' className="bg-black text-xs text-white px-10 py-4">
          Subscribe
        </button>
      </form>
    </div>
  );
}
