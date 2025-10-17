// CLONEFIX - Aplicación principal
console.log('CLONEFIX App iniciada');

// Variables globales
let trendingMovies = [];
let heroMovie = null;

// Función para obtener películas trending de TVMaze
async function fetchTrendingMovies() {
    try {
        const response = await fetch('https://api.tvmaze.com/shows');
        const movies = await response.json();
        
        // Filtrar y tomar las primeras películas
        trendingMovies = movies.slice(0, 20);
        console.log('@@@ trending =>', trendingMovies);
        
        // Seleccionar película hero (la primera con imagen)
        heroMovie = trendingMovies.find(movie => movie.image && movie.image.medium) || trendingMovies[0];
        setupHeroMovie(heroMovie);
        
        displayMovies(trendingMovies);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
    }
}

// Función para mostrar las películas en la grilla
function displayMovies(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Función para crear una tarjeta de película
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const poster = movie.image?.medium || 'https://via.placeholder.com/200x300/222/fff?text=No+Image';
    const year = movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A';
    const rating = movie.rating?.average || 'N/A';
    
    card.innerHTML = `
        <img src="${poster}" alt="${movie.name}" class="movie-poster" onerror="this.src='https://via.placeholder.com/200x300/222/fff?text=No+Image'">
        <div class="movie-info">
            <h3 class="movie-title">${movie.name}</h3>
            <p class="movie-year">${year}</p>
            <p class="movie-rating">⭐ ${rating}</p>
        </div>
    `;
    
    // Agregar evento de clic para mostrar modal
    card.addEventListener('click', () => {
        showMovieModal(movie);
    });
    
    return card;
}

// Función para buscar películas
async function searchMovies(query) {
    if (!query.trim()) {
        displayMovies(trendingMovies);
        return;
    }
    
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        const results = await response.json();
        
        const movies = results.map(result => result.show);
        
        // Enriquecer datos de películas con información adicional
        const enrichedMovies = await Promise.all(
            movies.map(async (movie) => {
                try {
                    // Obtener información detallada de cada película
                    const detailResponse = await fetch(`https://api.tvmaze.com/shows/${movie.id}`);
                    const detailedMovie = await detailResponse.json();
                    return detailedMovie;
                } catch (error) {
                    console.warn(`No se pudo obtener detalles para ${movie.name}:`, error);
                    return movie;
                }
            })
        );
        
        displayMovies(enrichedMovies);
    } catch (error) {
        console.error('Error searching movies:', error);
    }
}

// Función para obtener el sitio web oficial de una película
function getOfficialWebsite(movie) {
    // Buscar en los enlaces externos de TVMaze
    if (movie.externals && movie.externals.homepage) {
        return movie.externals.homepage;
    }
    
    // Buscar en los enlaces web
    if (movie._links && movie._links.webChannel && movie._links.webChannel.href) {
        return movie._links.webChannel.href;
    }
    
    // Buscar en network links
    if (movie.network && movie.network.officialSite) {
        return movie.network.officialSite;
    }
    
    // Intentar construir URL basada en el nombre para sitios conocidos
    const movieName = movie.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Lista de sitios oficiales conocidos
    const officialSites = {
        'the-simpsons': 'https://www.thesimpsons.com/',
        'breaking-bad': 'https://www.amc.com/shows/breaking-bad',
        'game-of-thrones': 'https://www.hbo.com/game-of-thrones',
        'the-office': 'https://www.nbc.com/the-office',
        'friends': 'https://www.warnerbros.com/tv/friends',
        'stranger-things': 'https://www.netflix.com/title/80057281',
        'the-walking-dead': 'https://www.amc.com/shows/the-walking-dead',
        'house-of-cards': 'https://www.netflix.com/title/70178217',
        'orange-is-the-new-black': 'https://www.netflix.com/title/70242311'
    };
    
    // Buscar coincidencias parciales
    for (const [key, url] of Object.entries(officialSites)) {
        if (movieName.includes(key) || key.includes(movieName)) {
            return url;
        }
    }
    
    return null;
}

// Función para configurar la película hero
function setupHeroMovie(movie) {
    const heroSection = document.querySelector('.hero-section');
    const watchNowBtn = document.querySelector('.watch-now-btn');
    
    if (movie) {
        // Actualizar fondo del hero con imagen de la película
        if (movie.image && movie.image.original) {
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${movie.image.original}')`;
        }
        
        // Configurar botón "Ver Ahora" para mostrar modal
        watchNowBtn.addEventListener('click', () => {
            showMovieModal(movie);
        });
    }
}

// Función para mostrar el modal con información de la película
function showMovieModal(movie) {
    const modal = document.getElementById('movieModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalGenres = document.getElementById('modalGenres');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const webSiteBtn = document.getElementById('webSiteBtn');
    
    // Llenar información del modal
    modalTitle.textContent = movie.name;
    modalImage.src = movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/300x400/222/fff?text=No+Image';
    modalImage.alt = movie.name;
    
    // Generar géneros
    modalGenres.innerHTML = '';
    if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach(genre => {
            const genreTag = document.createElement('span');
            genreTag.className = 'genre-tag';
            genreTag.textContent = genre;
            modalGenres.appendChild(genreTag);
        });
    }
    
    // Descripción
    if (movie.summary) {
        // Limpiar HTML tags de la descripción
        const cleanSummary = movie.summary.replace(/<[^>]*>/g, '');
        modalDescription.textContent = cleanSummary;
    } else {
        modalDescription.textContent = 'Descripción no disponible.';
    }
    
    // Detalles adicionales
    const language = movie.language || 'N/A';
    const status = movie.status || 'N/A';
    const year = movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A';
    
    modalDetails.innerHTML = `
        <p><strong>Año:</strong> ${year}</p>
        <p><strong>Lenguaje:</strong> ${language}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Rating:</strong> ${movie.rating?.average || 'N/A'}</p>
    `;
    
    // Configurar botón Web Site
    webSiteBtn.onclick = () => {
        // Intentar obtener el sitio web oficial
        const officialUrl = getOfficialWebsite(movie);
        if (officialUrl) {
            window.open(officialUrl, '_blank');
        } else {
            // Fallback a TVMaze si no hay sitio oficial
            if (movie.url) {
                window.open(movie.url, '_blank');
            } else {
                alert('Sitio web no disponible para esta película.');
            }
        }
    };
    
    // Mostrar modal
    modal.classList.add('active');
    
    // Configurar cierre del modal
    const closeModal = () => {
        modal.classList.remove('active');
    };
    
    document.getElementById('closeModal').onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Función para inicializar la aplicación
function initApp() {
    console.log('Inicializando aplicación...');
    
    // Cargar películas trending al inicio
    fetchTrendingMovies();
    
    // Configurar búsqueda
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        searchMovies(query);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            searchMovies(query);
        }
    });
}

// Inicializar la aplicación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', initApp);
