import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './BookDetail.css';
import AdminSidebar from '../AdminModule/AdminSidebar';

const BookCard = ({ image, title, author, oldPrice, newPrice, isSale, isHot, onClick }) => {
    return (
        <div className="book-card" onClick={onClick}>
            <div className="book-image">
                <img src={image} alt={title} />
                {isSale && <div className="tag sale">SALE</div>}
                {isHot && <div className="tag hot">HOT</div>}
            </div>
            <div className="book-info">
                {oldPrice && <span className="old-price">₹{oldPrice}</span>}
                <span className="new-price">₹{newPrice}</span>
                <h3>{title}</h3>
                <p>By {author}</p>
            </div>
        </div>
    );
};

const BookDetail = () => {
    const [books] = useState([
        {
            id: '1',
            image: 'https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-19-330x462.jpg',
            title: 'Bulle & Pelle',
            author: 'SAVANNA WALKER',
            oldPrice: '190.00',
            newPrice: '160.00',
            images: [
                'https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-19-330x462.jpg',
                'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
            ],
            videos: 'https://mixkit.co/free-stock-video/woman-sitting-reading-in-pajamas-4950/',
            description: "Fashion has been creating well-designed collections since 2010...",
            categories: ['Action & Adventure', 'Cultural'],
            tags: ['Books', 'Fiction', 'Romance'],
            edition: 'First Edition',
            yearsUsed: '2 years',
        },
        {
            id: '2',
            image: 'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/22.jpg',
            title: 'Mexican Gothic',
            author: 'SIVIA MORENO',
            oldPrice: '240.00',
            newPrice: '220.00',
            images: [
                'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/22.jpg'
            ],
            videos: 'https://mixkit.co/free-stock-video/woman-sitting-reading-in-pajamas-4950/',
            description: "Mexican Gothic is a novel...",
            categories: ['Fiction', 'Horror'],
            tags: ['Books', 'Fiction', 'Horror'],
            edition: 'Second Edition',
            yearsUsed: '1 year',
        },
    ]);

    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isVideoSelected, setIsVideoSelected] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const observer = useRef();

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        observer.current = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const cards = document.querySelectorAll('.book-card');
        cards.forEach((card) => observer.current.observe(card));

        return () => observer.current.disconnect();
    }, []);

    const handleCardClick = (book) => {
        setSelectedBook(book);
        setShowModal(true);
        setSelectedImage(book.images[0]);
        setIsVideoSelected(false);
    };

    const handleClose = () => setShowModal(false);

    const handleReborn = () => {
        alert(`The book "${selectedBook.title}" is reborn!`);
        // Add additional logic for the "Reborn" action here
    };

    const handleDie = () => {
        alert(`The book "${selectedBook.title}" is no more!`);
        // Add additional logic for the "Die" action here
    };

    return (
        <div>
            <AdminSidebar />
            <div className='cards-container p-5'>
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="card-link"
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleCardClick(book)}
                    >
                        <BookCard {...book} />
                    </div>
                ))}
            </div>

            {selectedBook && (
                <Modal show={showModal} onHide={handleClose} size="lg" className="custom-modal" style={{marginTop: '80px'}}>
                    <Modal.Body>
                        <div className="book-detail-container book-detail">
                            <div className="book-detail-left">
                                <div className="book-detail-thumbnails">
                                    {selectedBook.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="thumbnail-image book-image"
                                            onClick={() => {
                                                setSelectedImage(img);
                                                setIsVideoSelected(false);
                                            }}
                                        />
                                    ))}
                                    {selectedBook.videos && (
                                        <video
                                            className="thumbnail-video"
                                            onClick={() => setIsVideoSelected(true)}
                                        >
                                            <source src={selectedBook.videos} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                                <div className="book-detail-main-view">
                                    {isVideoSelected ? (
                                        <video controls className="main-video">
                                            <source src={selectedBook.videos} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img src={selectedImage || selectedBook.images[0]} alt="Main view" className="main-image" />
                                    )}
                                </div>
                            </div>
                            <div className="book-detail-right book-info">
                                <h2>{selectedBook.title}</h2>
                                <p className="author">By {selectedBook.author}</p>
                                <p className="edition">{selectedBook.edition}</p>
                                <p className="years-used">Used for: {selectedBook.yearsUsed}</p>
                                {selectedBook.oldPrice && <p className="old-price">₹{selectedBook.oldPrice}</p>}
                                <p className="new-price">₹{selectedBook.newPrice}</p>
                                <p className="description">{selectedBook.description}</p>
                                <p className="categories">
                                    Categories: {selectedBook.categories.join(', ')}
                                </p>
                                <p className="tags">Tags: {selectedBook.tags.join(', ')}
                                </p>
                                    <Button 
                                        style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
                                        onClick={handleReborn}
                                    >
                                        Reborn
                                    </Button>
                                    <Button 
                                        style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', color: '#fff', marginLeft: '10px' }} 
                                        onClick={handleDie}
                                    >
                                        Die
                                    </Button>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default BookDetail;
