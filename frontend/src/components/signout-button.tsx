import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"

const SignOutButton = () => {

 const queryClient = useQueryClient()
 const { showToast } = useAppContext()

 const { mutate } = useMutation({
  mutationFn: apiClient.signOut,
  onSuccess: async (data) => {
   console.log(data)
   await queryClient.invalidateQueries({
    queryKey: ['validateToken']
   })
   showToast({ message: data.message, type: 'SUCCESS' })
  },
  onError: (err) => {
   showToast({ message: err.message, type: 'ERROR' })
  }
 })

 const handleClick = () => {
  mutate()
 }

 return (
  <div className="border border-white rounded p-0.5">
   <button onClick={handleClick} className="text-blue-900 px-3 py-1 bg-white text-lg font-semibold rounded hover:bg-gray-100">Sign-out</button>
  </div>
 )
}

export default SignOutButton