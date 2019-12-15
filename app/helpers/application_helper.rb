module ApplicationHelper
  def movie_api_key
    Rails.application.credentials.movie_api_key
  end
end
