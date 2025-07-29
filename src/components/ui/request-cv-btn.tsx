export const RequestCVButton = () => {
  const email = "andriadinugroho6@gmail.com";
  const subject = "Permintaan CV - [Isi Nama Anda]";
  const body =
    "Halo Andri,%0D%0A%0D%0ASaya tertarik untuk mengetahui lebih lanjut tentang Anda. Mohon kirimkan CV Anda ke alamat ini.%0D%0A%0D%0ATerima kasih.";

  return (
    <a
      href={`mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${body}`}
      className="bg-sky-700 dark:bg-gray-900 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
    >
      Download CV
    </a>
  );
};
