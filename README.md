# 🎬 CLONEFIX

Una aplicación web que replica la experiencia de Netflix con búsqueda de películas y series usando la API de TVMaze.

## ✨ Características

- 🔍 **Búsqueda en tiempo real** de películas y series
- 📱 **Diseño responsive** que se adapta a cualquier dispositivo
- 🌐 **Enlaces a sitios oficiales** de las películas
- 📊 **Información detallada** con géneros, ratings y descripciones
- 🎬 **Modal interactivo** con información completa de cada película

## 🛠️ Tecnologías Utilizadas

- **HTML5, CSS3, JavaScript ES6+**
- **TVMaze API** - Base de datos de películas y series
- **Python HTTP Server** - Servidor de desarrollo local

## 📦 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/Giomor30/CLONEFIX.git
cd CLONEFIX
```

2. **Inicia el servidor local:**
```bash
python -m http.server 5050
```

3. **Abre tu navegador y visita:**
```
http://localhost:5050
```

## 🎯 Uso

- Escribe el nombre de una película en la barra de búsqueda
- Haz clic en cualquier película para ver información detallada
- Usa el botón "Web Site" para visitar el sitio oficial
- El botón "Ver Ahora" muestra la película destacada

## 🔧 API Utilizada

**TVMaze API** - https://api.tvmaze.com/
- Endpoint: `/shows` - Películas trending
- Búsqueda: `/search/shows?q={query}` - Buscar películas
- Detalles: `/shows/{id}` - Información detallada
