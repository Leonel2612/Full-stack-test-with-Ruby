
namespace :earthquake_data do
    desc "Import earthquake data from USGS"
    task import: :environment do
        require 'net/http'
        require 'json'

        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
        uri = URI(url)
        response = Net::HTTP.get(uri)
        data = JSON.parse(response)
        skipped_count = 0

        data['features'].each do |feature|
            external_id = feature['id']
            magnitude = feature['properties']['mag']
            place = feature['properties']['place']
            time = feature['properties']['time']
            url = feature['properties']['url']
            detail = feature['properties']['detail']
            tsunami = feature['properties']['tsunami']
            mag_type = feature['properties']['magType']
            title = feature['properties']['title']
            longitude, latitude = feature['geometry']['coordinates']
            

            next if magnitude.nil? ||
                    external_id.nil? ||
                    mag_type.nil? ||
                    place.nil? ||
                    time.nil? ||
                    url.nil? ||
                    title.nil? ||
                    longitude.nil? ||
                    latitude.nil? ||
                    detail.nil? 
            
            next if Feature.exists?(external_id: external_id)
            
            begin
                Feature.create!(
                    external_id: external_id,
                    magnitude: magnitude,
                    place: place,
                    time: Time.at(time/1000),
                    url: url,
                    detail:detail,
                    tsunami: tsunami,
                    mag_type: mag_type,
                    title: title,
                    longitude: longitude,
                    latitude: latitude
                )

                rescue ActiveRecord::RecordInvalid => e
                    puts "Record not saved: #{e.message}"
                    skipped_count +=1
                rescue => e
                    puts "An error occurred while saving the record #{e.message}"
                    skipped_count +=1
                 end
            end
    
        puts "Amount of values that weren't saved because they don't meet the requirements of validations: #{skipped_count}"
    
    rescue JSON::ParserError
        puts "There was a problem parsing the GeoJSON data"

    rescue => e
        puts "An error ocurred! #{e.message}"
    end
end 










