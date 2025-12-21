export function Contact() {
  return (
    <section
      id="contact"
      className="py-5 md:py-5"
      style={{
        backgroundColor: 'var(--color-brand-primary)',
        color: 'var(--color-white)',
      }}
    >
      <div className="flex">
        {/* Left Glyph */}
        {/* <img
          src={new URL(`../assets/glifocinesesx.webp`, import.meta.url).href}
          alt="Glifo cinese sinistro"
          className="hidden md:block flex-none w-12 lg:w-50 h-auto"
        /> */}

        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-kungfu">
            Contattaci
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <p className="text-lg md:text-xl mb-3 md:mb-4">
                Pronto a iniziare il tuo percorso nel Kung Fu?
              </p>
              <p className="mb-4 md:mb-6 text-sm md:text-base">
                Contattaci per maggiori informazioni sui corsi e le iscrizioni.
              </p>
              <div className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
                <p>
                  Email:{' '}
                  <a href="mailto:asdserbarkungfu@gmail.com">
                    asdserbarkungfu@gmail.com
                  </a>
                </p>
                <p>
                  Telefono: <a href="tel:328-8825980">+39 328 8825980</a>
                </p>
              </div>
            </div>

            {/* Google Maps */}
            <div className="flex items-center justify-center gap-4">
              {/* Map Container */}
              <div
                className="rounded-lg overflow-hidden shadow-lg flex-1 max-w-3xl"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d358.46509909557705!2d13.891795953388815!3d42.928795708585795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1331f5fecb93994f%3A0xd98a11f43c89bd5c!2sSer.Bar.%20Kung.Fu.%20ASD!5e0!3m2!1sit!2sit!4v1764017746558!5m2!1sit!2sit"
                  width="100%"
                  height="300"
                  className="md:h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa Ser.Bar. - Palazzetto dello Sport San Benedetto del Tronto"
                ></iframe>
              </div>
            </div>

            <div className="text-center mt-4 md:mt-6">
              <a
                href="https://maps.app.goo.gl/b45dy4dk4WWX5QtG8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition text-sm md:text-base"
                style={{
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-brand-primary)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-gold)';
                  (e.target as HTMLAnchorElement).style.color = 'var(--color-brand-dark)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.backgroundColor = 'var(--color-white)';
                  (e.target as HTMLAnchorElement).style.color = 'var(--color-brand-primary)';
                }}
              >
                Apri in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Right Glyph */}
        {/* <img
          src={new URL(`../assets/glifocinesedx.webp`, import.meta.url).href}
          alt="Glifo cinese destro"
          className="hidden md:block flex-none w-12 lg:w-50 h-auto"
        /> */}
      </div>
    </section>
  );
}
