Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  namespace :api do
    resources :features, only: [:index, :show], defaults: {format: :json} do 
      resources :comments, only: [:create]
      resources :comments, only: [:index]
    end
  end
end


