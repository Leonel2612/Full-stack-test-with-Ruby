class RenameMagnitudToMagnitude < ActiveRecord::Migration[7.1]
  def change
    rename_column :features, :magnitud, :magnitude
  end
end
