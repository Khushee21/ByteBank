import { motion } from 'framer-motion';
import { Icons } from './icons';

const features = [
  {
    icon: <Icons.shield className="h-8 w-8" />,
    title: "Secure Storage",
    description: "Your assets are protected with enterprise-grade security and encryption."
  },
  {
    icon: <Icons.currencies className="h-8 w-8" />,
    title: "Multi-Currency",
    description: "Manage Bitcoin, Ethereum, stablecoins and more in one place."
  },
  {
    icon: <Icons.swap className="h-8 w-8" />,
    title: "Instant Swaps",
    description: "Exchange between supported assets with minimal fees."
  },
  {
    icon: <Icons.qrCode className="h-8 w-8" />,
    title: "QR Payments",
    description: "Send and receive crypto with simple QR code scanning."
  },
  {
    icon: <Icons.realTime className="h-8 w-8" />,
    title: "Real-Time Updates",
    description: "Get instant notifications for all wallet activity."
  },
  {
    icon: <Icons.fiat className="h-8 w-8" />,
    title: "Fiat On-Ramp",
    description: "Top up your wallet directly with credit card or bank transfer."
  }
];

export const FeaturesGrid = () => {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md bg-gradient-to-r from-blue-50 via-blue-400 to-blue-200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};