import ItemExplorer from "@/components/ItemExplorer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background-dark pt-20">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary-orange/5 rounded-[100%] blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-card-border h-20 flex items-center justify-between px-6 lg:px-12 transition-all">
        <div className="flex items-center gap-4 group cursor-pointer">
          <img
            src="https://www.freefirecommunity.com/wp-content/uploads/2025/06/cropped-FFCRefinedFavicon-1.png"
            alt="Free Fire Community Logo"
            className="w-10 h-10 rounded-xl object-contain group-hover:scale-110 transition-transform shadow-orange"
          />
          <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">
            Arsenal <span className="hidden sm:inline font-normal text-text-secondary ml-2 text-lg">by Free Fire Community</span>
          </h1>
        </div>

        {/* This could be extended for navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-semibold text-text-secondary hover:text-primary-orange transition-colors">Database</a>
          <a href="#" className="text-sm font-semibold text-text-secondary hover:text-primary-orange transition-colors">Weapons</a>
          <a href="#" className="text-sm font-semibold text-text-secondary hover:text-primary-orange transition-colors">Characters</a>
          <a href="https://discord.com/invite/free-fire-community-1025382753790865508" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-primary-orange/10 border border-primary-orange/30 text-primary-orange font-semibold hover:bg-primary-orange hover:text-white hover:shadow-orange transition-all duration-300">
            Join Discord
          </a>
        </nav>
      </header>

      {/* Main interactive area */}
      {/* Top Banner Ad (Above Items) */}
      <div className="flex justify-center w-full px-4 mb-8">
        <ins className="adsbygoogle"
          style={{ display: "block", minWidth: "300px", width: "100%", maxWidth: "1200px" }}
          data-ad-client="ca-pub-6409311049525505"
          data-ad-slot="7317445135"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      <ItemExplorer />

      {/* Footer Content derived from index.html */}
      <section className="mt-20 border-t border-card-border bg-gradient-to-b from-transparent to-black/80 pb-12 pt-20 px-4">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-text-secondary mb-4">
            The Ultimate Free Fire Database
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed mb-12">
            Arsenal is your comprehensive encyclopedia for all Garena Free Fire items, weapons, skins, characters and cosmetic collections. Search, filter and share your favorite items effortlessly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
            {[
              { title: "Everything in one place", desc: "Access the entire catalog of Free Fire items with thousands of updated entries." },
              { title: "Lightning Fast Search", desc: "Find any item instantly using names, IDs, or detailed descriptions with our optimized search engine." },
              { title: "Seamless Experience", desc: "Explore collections easily with beautifully animated item cards and responsive layouts." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card-bg/30 border border-white/5 hover:border-primary-orange/30 transition-colors">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-orange shadow-glow"></span>
                  {feature.title}
                </h4>
                <p className="text-text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Content Ad */}
          <div className="flex justify-center w-full mt-16 items-center flex-col gap-4">
            <h3 className="text-text-muted text-sm uppercase tracking-widest font-bold">Advertisement</h3>
            <ins className="adsbygoogle"
              style={{ display: "block", width: "100%", maxWidth: "1200px" }}
              data-ad-client="ca-pub-6409311049525505"
              data-ad-slot="4452408958"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          </div>
        </div>
      </section>

      <footer className="border-t border-card-border/50 py-12 px-6 bg-black mt-auto">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 text-left">

          {/* Brand & Socials */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-2">Free Fire Community</h4>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">The ultimate source for Free Fire news, items, esports updates, and community engagement globally.</p>

            <div className="flex gap-4 pt-2 text-text-muted text-sm underline-offset-4 underline flex-wrap">
              <a href="https://twitter.com/FreeFireInt" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">X (Twitter)</a>
              <a href="https://www.instagram.com/ff.communityofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Instagram</a>
              <a href="https://www.facebook.com/freefireint/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Facebook</a>
              <a href="https://discord.com/invite/free-fire-community-1025382753790865508" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Discord</a>
              <a href="https://www.linkedin.com/company/free-fire-community/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">LinkedIn</a>
              <a href="https://www.reddit.com/r/Free_Fire_Community/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Reddit</a>
            </div>
          </div>

          {/* Platforms */}
          <div className="lg:ml-auto">
            <h4 className="text-white font-bold text-lg mb-4">Official Platforms</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><a href="https://www.freefirecommunity.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Community Website</a></li>
              <li><a href="https://redeemhub.freefirecommunity.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Redeem Hub</a></li>
              <li><a href="https://developers.freefirecommunity.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Developer Platform</a></li>
              <li><a href="https://esports.freefirecommunity.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">Esports Platform</a></li>
            </ul>
          </div>

          <div className="lg:ml-auto">
            <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><a href="https://linktr.ee/FreeFireInt" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition-colors">LinkTree</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card-border/50 pt-8 text-center text-sm text-text-muted">
          <p className="mb-2">&copy; {new Date().getFullYear()} <span className="text-primary-orange">Arsenal - Free Fire Community</span>. All rights reserved.</p>
          <p className="max-w-xl mx-auto opacity-60">Item data sourced from Garena Free Fire. This site is not affiliated with Garena International. Free Fire is a trademark of Garena International.</p>
        </div>
      </footer>

      {/* Initialize AdSense script on mount */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
                setTimeout(() => {
                    document.querySelectorAll('.adsbygoogle').forEach((el) => {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    });
                }, 1500);
            });
          `,
        }}
      />
    </main>
  );
}
