import { Component } from 'react';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from "../../services/marvelService";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
       char: {},
       loading: true,
       error: false
    }
    marvelService = new MarvelService();
    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }
    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}  
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, homepage, thumbnail, wiki } = char;
    const notFoundPath = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let imgStyle = {'objectFit' : 'cover'};
    if(thumbnail === notFoundPath) {
        imgStyle = {'objectFit' : 'contain'}
    }
    return (
        <div className="randomchar__block">
            <div className="randomchar__info">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;