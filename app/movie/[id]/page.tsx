interface Props {
  params: {
    id: string
  }
}

export default async function MoviePage({ params }: Props){
    const {id} = await params
  return(

    <div className="min-h-screen flex items-center justify-center ">

      <h1 className="text-3xl text-black font-bold">
        Movie ID: {id}
      </h1>

    </div>

  )

}