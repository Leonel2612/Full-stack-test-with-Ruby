
module Api

    class FeaturesController < ApplicationController
        def index
            per_page = params[:per_page].to_i
            per_page = 1000 if per_page > 1000
            per_page = 2 if per_page <= 0


            if params[:mag_type].present?
                mag_types = params[:mag_type].respond_to?(:map) ? params[:mag_type] : [params[:mag_type]]
                mag_types.map! { |type| type.gsub("'","") }
                features_scope = Feature.where(mag_type: mag_types)
            else
                features_scope = Feature.all
            end

            # features_scope = params[:mag_type] ? Feature.where(mag_type: params[:mag_type].split(',')) : Feature.all
            @pagy, @features = pagy(features_scope, items: per_page || 10, page: params[:page])

            pagination_data = {
                current_page: @pagy.page,
                total: (@pagy.count.to_f/@pagy.items).round,
                per_page: @pagy.items,
            }

            render json: {
                data: @features.map { |feature| format_feature(feature)},
                pagination: pagination_data
            }
        end
        
        private

        def format_feature(feature)
            {
                id:feature.id,
                type:"feature",
                attributes:{
                    external_id:feature.external_id,
                    magnitude:feature.magnitude,
                    place:feature.place,
                    time:feature.time.iso8601,
                    tsunami:feature.tsunami ==1,
                    mag_type:feature.mag_type,
                    title:feature.title,
                    coordinates:{
                        longitude: feature.longitude,
                        latitude: feature.latitude
                    }
                },
                links:{
                    external_url:feature.url,
                    external_detail:feature.detail
                }

            }
        end 
        
    end 
    
end
