# 🎬 CLONEFIX

![CLONEFIX Logo](https://img.shields.io/badge/CLONEFIX-Netflix%20Clone-red?style=for-the-badge&logo=netflix)

Una aplicación web que replica la experiencia de Netflix con búsqueda de películas y series usando la API de TVMaze.

## ✨ Características


- 🔍 **Búsqueda en tiempo real** de películas y series
- 📱 **Diseño responsive** que se adapta a cualquier dispositivo
- 🌐 **Enlaces a sitios oficiales** de las películas
- 📊 **Información detallada** con géneros, ratings y descripciones
- 🎬 **Modal interactivo** con información completa de cada película

## 🚀 Demo

![CLONEFIX Screenshot](https://via.placeholder.com/800x400/000/fff?text=CLONEFIX+Demo)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript ES6+** - Funcionalidad interactiva
- **TVMaze API** - Base de datos de películas y series
- **Python HTTP Server** - Servidor de desarrollo local

## 📦 Instalación

### Prerrequisitos

- Python 3.x instalado en tu sistema
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Pasos de instalación

1. **Clona el repositorio:**


2. **Inicia el servidor local:**
```bash
python -m http.server 5050
```

3. **Abre tu navegador y visita:**
```
http://localhost:5050
```

## 🎯 Uso

### Funcionalidades principales

1. **Búsqueda de películas:**
   - Escribe el nombre de una película o serie en la barra de búsqueda
   - Presiona "Buscar" o Enter para ver los resultados

2. **Explorar películas trending:**
   - La página principal muestra las películas más populares
   - Haz clic en cualquier película para ver más detalles

3. **Ver información detallada:**
   - Haz clic en cualquier película para abrir el modal de información
   - Ve géneros, descripción, rating y más detalles
   - Haz clic en "Web Site" para visitar el sitio oficial

4. **Película destacada:**
   - El botón "Ver Ahora" muestra información de la película principal
   - El fondo cambia dinámicamente con la imagen de la película

## 🏗️ Estructura del Proyecto

```
CLONEFIX/
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── app.js             # Lógica de la aplicación
│   └── index.html         # Página adicional
├── index.html             # Página principal
├── README.md              # Documentación
├── Version1.md            # Notas de versión
└── package.json           # Configuración del proyecto
```

## 🔧 API Utilizada

**TVMaze API** - https://api.tvmaze.com/
- Endpoint principal: `/shows`
- Búsqueda: `/search/shows?q={query}`
- Detalles: `/shows/{id}`

### Ejemplo de uso de la API

```javascript
// Obtener películas trending
fetch('https://api.tvmaze.com/shows')
  .then(response => response.json())
  .then(data => console.log(data));

// Buscar películas
fetch('https://api.tvmaze.com/search/shows?q=breaking%20bad')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🎨 Características de Diseño

- **Tema oscuro** inspirado en Netflix
- **Tarjetas ovaladas** para las películas
- **Barra de búsqueda delgada** y moderna
- **Modal responsive** con información detallada
- **Efectos hover** y transiciones suaves
- **Diseño mobile-first**

## 🚀 Funcionalidades Futuras

- [ ] Sistema de favoritos
- [ ] Filtros por género
- [ ] Trailer integration
- [ ] Sistema de usuarios
- [ ] Recomendaciones personalizadas
- [ ] Modo offline

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Marco Aurelio Ramírez Silva**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/tu-usuario)

## 🙏 Agradecimientos

- [TVMaze](https://www.tvmaze.com/) por proporcionar la API gratuita
- [Netflix](https://www.netflix.com/) por la inspiración en el diseño
- La comunidad de desarrolladores web por las herramientas y recursos

## 📞 Contacto

¿Tienes preguntas o sugerencias? ¡No dudes en contactarme!

- Email: tu-email@ejemplo.com
- Twitter: [@tu-twitter](https://twitter.com/tu-twitter)

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐
