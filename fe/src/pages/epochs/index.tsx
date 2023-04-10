import Layout from '@/layouts'
import React from 'react'

Epochs.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default function Epochs() {
  return (
    <div></div>
  )
}
