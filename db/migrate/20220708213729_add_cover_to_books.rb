class AddCoverToBooks < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :cover_id, :string
  end
end
