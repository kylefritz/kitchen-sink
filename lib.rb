require 'ohm'

class Confession < Ohm::Model
  attribute :date
  attribute :phone_number
  counter :dooms
  counter :forgives

  index :phone_number

end


