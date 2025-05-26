// app/page.tsx
"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { ParticlesBackground } from '@/components/ui/particles';
import Particles from 'react-tsparticles';
import { WalletAnimation } from '@/components/ui/wallet-animation';
import { CurrencyTicker } from '@/components/ui/currency-ticker';
import { Testimonials } from '@/components/ui/testimonials';
import { FeaturesGrid } from '@/components/ui/features-grid';
import {motion} from 'framer-motion';
import Auth from '@/components/Auth';

export default function Home() {
  return (
  <div >
    <div className="relative overflow-hidden bg-blue-50">
      <div className="relative h-full w-full">
        <div className="absolute  z-0 ">
          <ParticlesBackground />
        </div>
  <div className='flex flex-row items-center justify-center mt-20 space-x-6'>
  <div>
  <img
    src="/img2.jpg"
    alt=""
    className="relative w-1/8 mx-20 z-10  mt-20  rounded-lg shadow-lg object-cover"
  />
  </div>
  <div>
    <h1 className='text-9xl font-bold text-blue-800'>BYTE BANK</h1>
  </div>
   </div>
</div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4  pb-32 text-center ">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto w-full">
        <div className="text-left  px-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-6xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Your Gateway to the Web3 World
          </h1>
          
          <p className=" text-2xl font-bold leading-8 text-muted-foreground max-w-2xl mx-auto">
            Experience the future of finance with our secure, multi-chain wallet. 
            Manage cryptocurrencies, swap assets, and transact seamlessly - all in one place.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold text-blue-700">
              <Link href="/">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="primary" className="rounded-full px-8 py-6 text-lg font-semibold">
              <Link href="/features" className="inline-flex items-center">
                Explore Features <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
       
        </div>
        <div className="flex flex-col items-center justify-center px-4">
         <Auth />
        </div>
        </div>
        
        {/* Animated wallet preview */}
        <div className="relative mt-16 w-full max-w-3xl mx-auto ">
          <WalletAnimation />
        </div>
      </section>
      
      {/* Trust indicators */}
      <div className="relative z-10 py-12 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-6 text-blue-800 font-bold">
            Trusted by thousands of users worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <Icons.stripe className="h-8 text-muted-foreground opacity-80 hover:opacity-100 transition-opacity" />
            <Icons.visa className="h-8 text-muted-foreground opacity-80 hover:opacity-100 transition-opacity" />
            <Icons.mastercard className="h-8 text-muted-foreground opacity-80 hover:opacity-100 transition-opacity" />
            <Icons.razorpay className="h-8 text-muted-foreground opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="relative z-10 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful Features for Your Digital Assets
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-blue-800 font-bold">
              Everything you need to manage your cryptocurrency portfolio
            </p>
          </div>
          
          <FeaturesGrid />
        </div>
      </section>
      
      {/* Multi-currency support */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-background/50 to-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12">
              Support for Multiple Currencies
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <CurrencyTicker symbol="BTC" name="Bitcoin" change={2.4} />
              <CurrencyTicker symbol="ETH" name="Ethereum" change={1.8} />
              <CurrencyTicker symbol="USDC" name="USD Coin" change={0.1} />
              <CurrencyTicker symbol="SOL" name="Solana" change={-0.5} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Ready to Join the Web3 Revolution?
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Create your wallet in seconds and start exploring decentralized finance
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-800 text-white">
                <Link href="/">Get Started for Free</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </div>
  );
}