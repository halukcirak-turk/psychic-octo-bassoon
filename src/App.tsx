import React, { useState } from 'react';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'brands' | 'tshirts' | 'detail'>('brands');
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedTshirt, setSelectedTshirt] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'haluk@ornek.com' && password === '123456') {
      setLoggedIn(true);
    } else {
      alert('Yanlış mail veya şifre. Deneme: haluk@ornek.com / 123456');
    }
  };

  const brands = [
    { id: 1, name: 'X MARKA', image: 'https://via.placeholder.com/300x400/4CAF50/white?text=X+MARKA' },
    { id: 2, name: 'Y MARKA', image: 'https://via.placeholder.com/300x400/2196F3/white?text=Y+MARKA' },
    { id: 3, name: 'Z MARKA', image: 'https://via.placeholder.com/300x400/FF5722/white?text=Z+MARKA' },
  ];

  const tshirts: any = {
    1: [
      { id: 1, name: 'Basic Tişört Beyaz', image: 'https://via.placeholder.com/600x800/FFFFFF/000000?text=Beyaz+Tişört' },
      { id: 2, name: 'Siyah Slim Fit', image: 'https://via.placeholder.com/600x800/000000/FFFFFF?text=Siyah+Tişört' },
    ],
    2: [{ id: 3, name: 'Mavi Polo', image: 'https://via.placeholder.com/600x800/2196F3/white?text=Mavi+Polo' }],
    3: [
      { id: 4, name: 'Kırmızı Oversize', image: 'https://via.placeholder.com/600x800/FF5722/white?text=Kırmızı+Oversize' },
      { id: 5, name: 'Gri Kapüşonlu', image: 'https://via.placeholder.com/600x800/9E9E9E/white?text=Gri+Kapüşonlu' },
    ],
  };

  const baseAccessories = [
    { name: 'Yaka Etiketi', price: '0.15 €', image: 'https://via.placeholder.com/100x100/EEEEEE/000000?text=Yaka+Etiketi' },
    { name: 'Yan Dikiş Etiketi', price: '0.10 €', image: 'https://via.placeholder.com/100x100/DDDDDD/000000?text=Yan+Etiket' },
    { name: 'Beyaz Düğme 4 Delik', price: '0.08 €', image: 'https://via.placeholder.com/100x100/FFFFFF/000000?text=Düğme' },
    { name: 'Boyun Bandı', price: '0.20 €', image: 'https://via.placeholder.com/100x100/CCCCCC/000000?text=Boyun+Bandı' },
    { name: 'Küçük Fermuar', price: '0.35 €', image: 'https://via.placeholder.com/100x100/AAAAAA/000000?text=Fermuar' },
  ];

  const accessories: any = {
    1: baseAccessories,
    2: baseAccessories,
    3: baseAccessories,
    4: baseAccessories,
    5: baseAccessories,
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Giriş Yap</h1>
          <p>Müşteri katalog erişimi</p>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Giriş Yap</button>
          </form>
          <small>Deneme hesabı: haluk@ornek.com → 123456</small>
        </div>
      </div>
    );
  }

  if (currentView === 'brands') {
    return (
      <div className="app">
        <header>
          <h1>Tekstil Aksesuar Kataloğu</h1>
          <p>Hoş geldin!</p>
        </header>
        <div className="brands">
          <h2>Markalar</h2>
          <div className="brand-grid">
            {brands.map((brand) => (
              <div key={brand.id} className="brand-card" onClick={() => {
                setSelectedBrand(brand);
                setCurrentView('tshirts');
              }}>
                <img src={brand.image} alt={brand.name} />
                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'tshirts') {
    return (
      <div className="app">
        <header>
          <h1>{selectedBrand?.name}</h1>
          <button className="back-btn" onClick={() => setCurrentView('brands')}>← Geri</button>
        </header>
        <div className="tshirt-gallery">
          <h2>Tişört Modelleri</h2>
          <div className="tshirt-grid">
            {tshirts[selectedBrand.id].map((tshirt: any) => (
              <div key={tshirt.id} className="tshirt-card" onClick={() => {
                setSelectedTshirt(tshirt);
                setCurrentView('detail');
              }}>
                <img src={tshirt.image} alt={tshirt.name} />
                <p>{tshirt.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'detail') {
    const accs = accessories[selectedTshirt.id];
    return (
      <div className="app detail-view">
        <header>
          <h1>{selectedTshirt.name}</h1>
          <button className="back-btn" onClick={() => setCurrentView('tshirts')}>← Geri</button>
        </header>
        <div className="detail-container">
          <div className="tshirt-large">
            <img src={selectedTshirt.image} alt={selectedTshirt.name} />
          </div>
          <div className="accessories-list">
            <h2>Aksesuarlar</h2>
            {accs.map((acc: any, index: number) => (
              <div key={index} className="accessory-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={acc.image} alt={acc.name} />
                <div className="acc-info">
                  <h4>{acc.name}</h4>
                  <p className="price">{acc.price}</p>
                </div>
                <button className="order-btn" onClick={() => alert(`${acc.name} sipariş verildi!`)}>
                  Sipariş Ver
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
