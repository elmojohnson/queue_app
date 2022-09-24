import { useState } from "react";

const useDeleteTrack = () => {
    const [isDeleting, setDeleting] = useState(false);

    const deleteTrack = () => {
        
    }

    return {isDeleting}
}

export default useDeleteTrack;