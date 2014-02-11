class PhotoTagging < ActiveRecord::Base
  attr_accessible :photo_id, :user_id, :x_pos, :y_pos

  belongs_to :photo
  belongs_to :user

  validates :photo_id, :user_id, :x_pos, :y_pos, :presence => true
end
