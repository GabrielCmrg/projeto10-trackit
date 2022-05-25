import { ThreeDots } from  'react-loader-spinner';

export default function Loader() {
    return (
        <ThreeDots
            height="50"
            width="50"
            color='white'
            ariaLabel='loading'
        />
    );
}