'use client';

import {motion} from 'framer-motion';
import { Icons } from './icons';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Crypto Trader",
    content: "This wallet makes managing my portfolio so easy. The swap feature saves me time and the UI is beautiful.",
    avatar: "/avatars/avatar1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Blockchain Developer",
    content: "As a developer, I appreciate the clean API and security features. The real-time updates are incredibly reliable.",
    avatar: "/avatars/avatar2.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "NFT Collector",
    content: "Perfect for my NFT transactions. The QR code feature makes meetups and payments super convenient.",
    avatar: "/avatars/avatar3.jpg"
  }
];

export const Testimonials = () => {
  return (
    <div className="mx-auto max-w-4xl ">
      <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12">
        What Our Users Say
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 via-blue-400 to-blue-100 border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                {/* Replace with actual avatar image */}
                <div className="bg-muted h-full w-full flex items-center justify-center">
                  <Icons.user className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
            <p className="text-muted-foreground">{testimonial.content}</p>
            <div className="mt-4 flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Icons.star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};