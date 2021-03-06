import { useEffect } from "react"

const Index = () => {

    useEffect(() => {
        fetch('http://xa.pupuwang.com/transfer/detail/603c47d02f37cd00017087e7')
    },[])

    return <div>111</div>
}

export default Index