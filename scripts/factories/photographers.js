function photographerFactory(data) {
    // Added city, country, tagline, price, id
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        const h3 = document.createElement( 'h3' );
        h3.textContent = city + '/' + country;
        article.appendChild(h3);

        const paragraph = document.createElement( 'p' );
        paragraph.textContent = tagline;
        article.appendChild(paragraph);

        const span = document.createElement( 'span' );
        span.textContent = '$' + price + '/day';
        article.appendChild(span);

        return (article);
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM }
}