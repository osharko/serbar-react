export function Contact() {
  return (
    <section
      id="contact"
      className="py-12 md:py-20"
      style={{
        backgroundColor: 'var(--color-brand-primary)',
        color: 'var(--color-white)',
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Contattaci</h2>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-lg md:text-xl mb-3 md:mb-4">
              Pronto a iniziare il tuo percorso nel Kung Fu?
            </p>
            <p className="mb-4 md:mb-6 text-sm md:text-base">
              Contattaci per maggiori informazioni sui corsi e le iscrizioni.
            </p>
            <div className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
              <p>Email: giuveba@libero.it</p>
              <p>Telefono: +39 328 8825980</p>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-lg overflow-hidden shadow-lg" style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.834634494447!2d13.88378!3d42.944166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132e700d4c7b4e89%3A0x5f6c3e3b4c7b4e89!2sPalazzetto%20dello%20Sport%20San%20Benedetto%20del%20Tronto!5e0!3m2!1sit!2sit!4v1234567890"
              width="100%"
              height="300"
              className="md:h-[400px]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Ser.Bar. - Palazzetto dello Sport San Benedetto del Tronto"
            ></iframe>
          </div>

          <div className="text-center mt-4 md:mt-6">
            <a
              href="https://maps.app.goo.gl/itYfxC6qi5oNZhs18"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition text-sm md:text-base"
              style={{
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-brand-primary)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-accent-gold)';
                e.target.style.color = 'var(--color-brand-dark)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-white)';
                e.target.style.color = 'var(--color-brand-primary)';
              }}
            >
              Apri in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
