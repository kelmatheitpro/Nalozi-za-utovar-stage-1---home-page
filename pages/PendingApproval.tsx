import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/UIComponents'
import { Clock, ArrowLeft, CheckCircle, XCircle, Mail, Phone } from 'lucide-react'
import { UserStatus } from '../types'

export const PendingApproval = () => {
  const { profile, signOut } = useAuth()

  if (!profile) return null

  const getStatusInfo = () => {
    switch (profile.status) {
      case UserStatus.PENDING:
        return {
          icon: Clock,
          title: 'Čeka odobrenje',
          message: 'Vaš nalog je u procesu verifikacije. Administrator će uskoro pregledati vašu prijavu.',
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20'
        }
      case UserStatus.REJECTED:
        return {
          icon: XCircle,
          title: 'Nalog odbačen',
          message: 'Nažalost, vaša prijava nije odobrena. Molimo kontaktirajte podršku za više informacija.',
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20'
        }
      default:
        return {
          icon: CheckCircle,
          title: 'Odobreno',
          message: 'Vaš nalog je odobren!',
          color: 'text-brand-500',
          bgColor: 'bg-brand-500/10',
          borderColor: 'border-brand-500/20'
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" />
            Nazad na početnu
          </Link>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-8 w-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white dark:text-black font-black text-lg leading-none">T</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold tracking-tight text-text-main">Teret</span>
              <span className="text-xl font-bold tracking-tight text-brand-500">Link</span>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-surface border border-border rounded-xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <div className={`w-16 h-16 ${statusInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 ${statusInfo.borderColor} border`}>
              <StatusIcon className={`h-8 w-8 ${statusInfo.color}`} />
            </div>
            
            <h2 className="text-2xl font-bold text-text-main mb-2">{statusInfo.title}</h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              {statusInfo.message}
            </p>

            {/* Rejection Reason */}
            {profile.status === UserStatus.REJECTED && profile.rejectionReason && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h3 className="font-medium text-red-500 mb-2">Razlog odbijanja:</h3>
                <p className="text-red-400 text-sm">{profile.rejectionReason}</p>
              </div>
            )}

            {/* Company Info */}
            <div className="space-y-3 mb-8">
              <div className={`p-4 ${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg text-left`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Firma</div>
                    <div className="font-medium text-text-main">{profile.company?.name || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Status</div>
                    <div className={`font-medium ${statusInfo.color} capitalize`}>
                      {profile.status === UserStatus.PENDING ? 'Na čekanju' : 
                       profile.status === UserStatus.APPROVED ? 'Odobreno' : 'Odbačeno'}
                    </div>
                  </div>
                  <div>
                    <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Kategorija</div>
                    <div className="font-medium text-text-main text-xs">
                      {profile.company?.category === 'Transport Company / Carrier' ? 'Prevoznik' :
                       profile.company?.category === 'Freight Forwarder' ? 'Špediter' :
                       profile.company?.category || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Lokacija</div>
                    <div className="font-medium text-text-main text-xs">
                      {profile.company?.city}, {profile.company?.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {profile.status === UserStatus.REJECTED && (
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h3 className="font-medium text-text-main mb-2">Potrebna pomoć?</h3>
                  <div className="flex gap-3 justify-center">
                    <a 
                      href="mailto:support@teretlink.com" 
                      className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-400 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Email podrška
                    </a>
                    <a 
                      href="tel:+381111234567" 
                      className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-400 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      Pozovite nas
                    </a>
                  </div>
                </div>
              )}
              
              <Button onClick={signOut} variant="outline" className="w-full">
                Odjavi se
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-text-muted">
            Imate pitanja? Kontaktirajte nas na{' '}
            <a href="mailto:support@teretlink.com" className="text-brand-500 hover:text-brand-400">
              support@teretlink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}