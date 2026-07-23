const base = '/images/gallery/momentos-inolvidables';
const thumbs = `${base}/thumbs`;

function photo(file, alt) {
  const id = file.replace(/\.[^.]+$/, '');
  const ext = file.includes('.') ? file.slice(file.lastIndexOf('.')) : '.jpg';
  return {
    id,
    thumb: `${thumbs}/${id}.jpg`,
    full: `${base}/${id}${ext}`,
    alt,
  };
}

export const galleryImages = [
  photo('20250703_134145.jpg', 'Visita a la Plaza Selk\'nam'),
  photo('20250804_125106.jpg', 'Grupo de turistas en la barcaza'),
  photo('20250814_131642.jpg', 'Escultura del cisne de cuello negro'),
  photo('20250831_170439.jpg', 'Faro en la costa de Tierra del Fuego'),
  photo('20251012_133122.jpg', 'Momento junto al cisne de cuello negro'),
  photo('20251012_162532.jpg', 'Encuentro con pingüinos rey'),
  photo('20251018_161517.jpg', 'Grupo en el Mirador Hain'),
  photo('20251018_164010.jpg', 'Paseo por Porvenir'),
  photo('20251020_105928.jpg', 'Grupo en el monumento Selk\'nam Wiweinar'),
  photo('20251031_173457.jpg', 'Mural Selk\'nam en Porvenir'),
  photo('20251101_112615.jpg', 'Laguna de los Cisnes, estromatolitos'),
  photo('20251106_123028.jpg', 'Estromatolitos, Laguna de los Cisnes'),
  photo('20251106_130744.jpg', 'Mirador Hain con vista a Porvenir'),
  photo('20251106_132814.jpg', 'Estatuas Selk\'nam en la plaza'),
  photo('20251109_173236.jpg', 'Letrero de Porvenir, 128 años'),
  photo('20251119_114645.jpg', 'Grupo en estancia patagónica'),
  photo('20251120_112053.jpg', 'Caminata hacia los estromatolitos'),
  photo('20260627_004515.jpeg', 'Grupo en marco conmemorativo de Porvenir'),
  photo('20260627_004516.jpeg', 'Grupo junto a los estromatolitos'),
];
