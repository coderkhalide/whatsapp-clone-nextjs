import { Circle } from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{ display: 'grid', placeItems: 'center', height: '100vh'}}>
            <div>
                <img 
                    src="https://i.pinimg.com/originals/fd/d8/97/fdd89706e35f9bc4493559caef4f1122.png" 
                    alt="Loading"
                    width={300}
                    style={{ marginBottom: 15 }}
                />
                <Circle color="#13990A" size={50} />
            </div>
        </center>
    )
}

export default Loading
