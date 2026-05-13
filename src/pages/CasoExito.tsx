import { Trophy, Package, Code2, Trash2, Globe, Clock } from 'lucide-react';
import './CasoExito.css';

const logros = [
  {
    icon: <Package size={22} />,
    color: '#6366f1',
    titulo: 'App de stock desde cero',
    descripcion: 'Desarrollamos una aplicación de gestión de stock completa, pensada específicamente para su operación de ventas diaria.',
  },
  {
    icon: <Code2 size={22} />,
    color: '#10b981',
    titulo: 'Script Python · +270 productos con imágenes',
    descripcion: 'Creamos un script automatizado que cargó imágenes a más de 270 productos de forma masiva, sin intervención manual.',
  },
  {
    icon: <Trash2 size={22} />,
    color: '#f59e0b',
    titulo: 'Script Python · eliminación masiva',
    descripcion: 'Desarrollamos un script que eliminó más de 1.000 productos en simultáneo, resolviendo en minutos lo que hubiera tomado días.',
  },
  {
    icon: <Globe size={22} />,
    color: '#06b6d4',
    titulo: 'Migración de urgencia a Impretienda',
    descripcion: 'Migramos toda la tienda a Impretienda bajo presión máxima, garantizando continuidad operativa sin pérdida de datos.',
  },
];

export default function CasoExito() {
  return (
    <div className="caso-page fade-in">

      {/* Header */}
      <header className="caso-header">
        <div className="caso-header-left">
          <div className="caso-badge">
            <Trophy size={14} />
            Caso de éxito
          </div>
          <h1>Right Botines</h1>
          <p className="caso-subtitle text-muted">
            Tienda de calzado · Migración + automatización en tiempo récord
          </p>
        </div>
        <div className="caso-hero-stat glass-panel">
          <Clock size={20} className="hero-stat-icon" />
          <span className="hero-stat-value">12 hs</span>
          <span className="hero-stat-label">Todo entregado</span>
        </div>
      </header>

      {/* Resumen de la noche */}
      <div className="caso-noche glass-panel">
        <span className="noche-emoji">🌙</span>
        <div>
          <p className="noche-title">La noche que lo cambiamos todo</p>
          <p className="noche-desc text-muted">
            Arrancamos a las <strong>19:00 hs</strong> y no paramos hasta las <strong>07:30 hs</strong> del día siguiente.
            12 horas non-stop para construir, migrar y automatizar todo lo que Right Botines necesitaba para operar.
          </p>
        </div>
      </div>

      {/* Logros */}
      <div className="caso-grid">
        {logros.map((l) => (
          <div key={l.titulo} className="caso-card glass-panel">
            <div className="caso-card-icon" style={{ color: l.color, background: `${l.color}18` }}>
              {l.icon}
            </div>
            <div>
              <h3 className="caso-card-titulo">{l.titulo}</h3>
              <p className="caso-card-desc text-muted">{l.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div className="caso-stats glass-panel">
        <div className="caso-stat">
          <span className="caso-stat-value">+270</span>
          <span className="caso-stat-label text-muted">productos cargados</span>
        </div>
        <div className="caso-divider" />
        <div className="caso-stat">
          <span className="caso-stat-value">+1.000</span>
          <span className="caso-stat-label text-muted">productos eliminados</span>
        </div>
        <div className="caso-divider" />
        <div className="caso-stat">
          <span className="caso-stat-value">12 hs</span>
          <span className="caso-stat-label text-muted">de trabajo continuo</span>
        </div>
        <div className="caso-divider" />
        <div className="caso-stat">
          <span className="caso-stat-value">0</span>
          <span className="caso-stat-label text-muted">pérdida de datos</span>
        </div>
      </div>

    </div>
  );
}
