import { useQuery } from '@apollo/client'
import { TX_STATUS_QUERY } from '@components/Shared/Navbar/Login/Create/Pending'
import { Button } from '@components/UI/Button'
import { Spinner } from '@components/UI/Spinner'
import AppContext from '@components/utils/AppContext'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC, useContext } from 'react'

interface Props {
  isDisable: boolean
  txHash: string
}

const Pending: FC<Props> = ({ txHash, isDisable }) => {
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery(TX_STATUS_QUERY, {
    variables: {
      request: { txHash }
    },
    pollInterval: 1000
  })

  return (
    <div className="p-5 py-10 font-bold text-center">
      {loading || !data?.hasTxHashBeenIndexed?.indexed ? (
        <div className="space-y-3">
          <Spinner className="mx-auto" />
          <div>
            Super follow {isDisable ? 'disable' : 'setup'} in progress, please
            wait!
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-[40px]">🌿</div>
          <div>Super follow {isDisable ? 'disabled' : 'set'} successfully</div>
          <div className="pt-3">
            <Link href={`/u/${currentUser?.handle}`}>
              <a>
                <Button
                  className="mx-auto"
                  icon={<ArrowRightIcon className="w-4 h-4 mr-1" />}
                >
                  Go to profile
                </Button>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pending
