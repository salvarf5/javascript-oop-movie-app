// Movie Constructor
class Movie {
    constructor(name, year, rate) {
        this.name = name;
        this.year = year;
        this.rate = rate;
    }
}

// UI Constructor
class UI {
    addMovie(movie) {
        const movieList = document.getElementById('movie-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Movie</strong>: ${movie.name} -
                    <strong>Year</strong>: ${movie.year} - 
                    <strong>Rate</strong>: ${movie.rate}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        movieList.appendChild(element);
    }

    resetForm() {
        document.getElementById('movie-form').reset();
    }

    deleteMovie(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Movie Deleted Successfully', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in The DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        // Insert Message in the UI
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
document.getElementById('movie-form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('name').value,
            year = document.getElementById('year').value,
            rate = document.getElementById('rate').value;

        // Create a new Oject Movie
        const movie = new Movie(name, year, rate);

        // Create a new UI
        const ui = new UI();

        // Input User Validation
        if (name === '' || year === '' || rate === '') {
            ui.showMessage('Please Insert data in all fields', 'danger');
        }

        // Save Movie
        ui.addMovie(movie);
        ui.showMessage('Movie Added Successfully', 'success');
        ui.resetForm();

        e.preventDefault();
    });

document.getElementById('movie-list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteMovie(e.target);
        e.preventDefault();
    });