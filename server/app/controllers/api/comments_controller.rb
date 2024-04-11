module Api
    class CommentsController < ApplicationController
        before_action :set_feature, only: [:index]
       def create
        feature = Feature.find(params[:feature_id])
        comment = feature.comments.new(comment_body)

        if comment.save
            render json: comment, status: :created
        else
            render json: {
                errors: comment.errors.full_messages
            },
            status: :unprocessable_entity
        end

       end

       def index
        comments = @feature.comments
        render json: comments
       end

       private
       def comment_body
        params.require(:comment).permit(:body)
       end
       
       def set_feature
        @feature = Feature.find(params[:feature_id])
       end

    end
end