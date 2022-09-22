import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import Layout from '../../layouts/Layout'

const Account = () => {
  const {data: session} = useSession();

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <Layout>
      Account
    </Layout>
  )
}

export default Account