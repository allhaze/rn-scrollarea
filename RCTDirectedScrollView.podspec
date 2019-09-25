Pod::Spec.new do |s|
  s.name           = 'RCTDirectedScrollView'
  s.version        = '1.0.0'
  s.summary        = 'A natively implemented scrollview component which lets you specify different scroll directions for child content.'
  s.description    = 'Bi-directional scrollview.'
  s.license        = 'MIT'
  s.author         = 'Chris Fisher'
  s.homepage       = 'https://github.com/allhaze/rn-scrollarea#readme'
  s.source         = { :git => 'https://github.com/allhaze/rn-scrollarea.git' }

  s.requires_arc   = true
  s.platform       = :ios, '10.0'

  s.source_files   = 'ios/RCTDirectedScrollView/*.{h,m}'

  s.dependency 'React'
end
