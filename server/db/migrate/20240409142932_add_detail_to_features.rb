class AddDetailToFeatures < ActiveRecord::Migration[7.1]
  def change
    add_column :features, :detail, :string
  end
end
