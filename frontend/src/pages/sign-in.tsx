import { useForm } from "react-hook-form"
import Navbar from "../components/navbar"
import Hero from "../components/hero"
import Footer from "../components/footer"
import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router"
import { Link } from "react-router"

export type SignInFormData = {
 email: string
 password: string
}

const SignIn = () => {

 const queryClient = useQueryClient()
 const navigate = useNavigate()
 const { showToast } = useAppContext()

 const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>()

 const { mutate } = useMutation({
  mutationFn: apiClient.signIn,
  onSuccess: async () => {
   //toast for playwright tests
   showToast({ message: 'Sign in successful!', type: 'SUCCESS' });

   // showToast({ message: 'Hello!: ' + data.userName + ', you signed-in successfully!', type: 'SUCCESS' });
   await queryClient.invalidateQueries({
    queryKey: ['validateToken']
   });
   navigate('/')
  },
  onError: (err) => {
   showToast({ message: err.message, type: 'ERROR' })
  }
 })

 const onSubmit = handleSubmit((data) => {
  mutate(data)
 })

 return (
  <form onSubmit={onSubmit} className="container mx-auto flex flex-col flex-1 gap-3">
   <h2 className="text-3xl font-bold text-gray-700 mt-3 py-2 md:py-5 px-10">Sign-in</h2>

   <div className="flex flex-col gap-4 px-10">
    <label className="flex flex-col text-gray-700 font-semibold">
     Email:
     <input type="email" className={`border focus:border-2 ${errors.email ? 'border-red-500' : 'border-blue-700'} p-2 rounded font-normal focus:outline-none`} {...register('email', { required: '*Email is required!' })} />
     {errors.email && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.email.message}</span>
     )}
    </label>
    <label className="flex flex-col text-gray-700 font-semibold">
     Password:
     <input type="password" className={`border focus:border-2 ${errors.password ? 'border-red-500' : 'border-blue-700'} p-2 rounded font-normal focus:outline-none`} {...register('password', { required: '*Password is required!' })} />
     {errors.password && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.password.message}</span>
     )}
    </label>

    <span className="flex flex-col sm:flex-row justify-between py-10">
     <span className="flex flex-col sm:flex-row sm:pt-5 items-center pl-1">
      Not Registered?<Link to='/register' className="text-blue-900 underline px-2 font-semibold" >Create an account here!</Link>
     </span>
     <button type="submit" className="bg-blue-700 px-10 py-2 rounded text-white text-xl font-semibold hover:bg-blue-600 hover:underline mt-5">Login</button>
    </span>
   </div>
  </form>
 )
}

export default SignIn;