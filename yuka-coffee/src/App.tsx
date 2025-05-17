import React, { useState } from 'react';
import { Coffee, MapPin, Instagram, Facebook, Twitter, ExternalLink, Menu, ChevronRight, ArrowLeft } from 'lucide-react';

// Define TypeScript interfaces for our components
interface Colors {
  burgundy: string;
  orange: string;
  cream: string;
  taupe: string;
  black: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface BookingPageProps {
  colors: Colors;
}

interface CafeMapProps {
  selectedSeat: string | null;
  onSeatSelect: (seatId: string) => void;
  unavailableSeats: Record<string, string[]>;
  currentTime: string;
}

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

interface TimePickerProps {
  time: string;
  onTimeChange: (time: string) => void;
}

interface FoodOrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface FoodOrder {
  savoury: FoodOrderItem[];
  sweet: FoodOrderItem[];
  beverage: FoodOrderItem[];
}

interface FoodOrderSectionProps {
  foodOrder: FoodOrder;
  onOrderChange: (category: string, items: FoodOrderItem[]) => void;
}

interface BookingSummaryProps {
  date: Date;
  time: string;
  slotLength: string;
  selectedSeat: string | null;
  foodOrder: FoodOrder;
  totalPrice: number;
}

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  colors: Colors;
}

interface FooterProps {
  setCurrentPage: (page: string) => void;
  colors: Colors;
}

interface PageProps {
  setCurrentPage: (page: string) => void;
  colors: Colors;
}

// Booking Page Component
const BookingPage = ({ colors }: BookingPageProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("12:00");
  const [slotLength, setSlotLength] = useState<string>("1");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [foodOrder, setFoodOrder] = useState<FoodOrder>({
    savoury: [],
    sweet: [],
    beverage: [],
  });
  const [step, setStep] = useState<"select" | "review" | "confirmed">("select"); // select, review, confirmed

  // Mock data for unavailable seats
  const unavailableSeats: Record<string, string[]> = {
    "table1-seat1": ["10:00", "11:00"],
    "table2-seat3": ["12:00", "13:00"],
    "long-table-seat2": ["15:00", "16:00", "17:00"],
  };

  const isSeatAvailable = (seatId: string): boolean => {
    if (!unavailableSeats[seatId]) return true;
    return !unavailableSeats[seatId].includes(time);
  };

  const handleSeatSelect = (seatId: string): void => {
    if (isSeatAvailable(seatId)) {
      setSelectedSeat(seatId);
    }
  };

  const handleFoodOrderChange = (category: string, items: FoodOrderItem[]): void => {
    setFoodOrder((prev) => ({
      ...prev,
      [category]: items,
    }));
  };

  const handleProceedToBook = (): void => {
    if (!selectedSeat) {
      alert("Please select a seat first");
      return;
    }
    setStep("review");
  };

  const handleConfirmBooking = (): void => {
    // Here you would typically send the booking data to your backend
    setStep("confirmed");
  };

  const getTotalPrice = (): number => {
    // Base booking fee
    const total = 200;

    // Add food items prices
    const itemPrices = [
      ...foodOrder.savoury.map((item) => item.price * (item.quantity || 1)),
      ...foodOrder.sweet.map((item) => item.price * (item.quantity || 1)),
      ...foodOrder.beverage.map((item) => item.price * (item.quantity || 1)),
    ];

    return total + itemPrices.reduce((sum, price) => sum + price, 0);
  };

  // Mock menu items for food order
  const MENU_ITEMS: Record<string, MenuItem[]> = {
    savoury: [
      { id: "s1", name: "Avocado Toast", price: 180, image: "/api/placeholder/80/80" },
      { id: "s2", name: "Egg Sandwich", price: 150, image: "/api/placeholder/80/80" },
      { id: "s3", name: "Chicken Wrap", price: 220, image: "/api/placeholder/80/80" },
      { id: "s4", name: "Vegetable Quiche", price: 190, image: "/api/placeholder/80/80" },
    ],
    sweet: [
      { id: "sw1", name: "Chocolate Croissant", price: 120, image: "/api/placeholder/80/80" },
      { id: "sw2", name: "Blueberry Muffin", price: 100, image: "/api/placeholder/80/80" },
      { id: "sw3", name: "Cheesecake", price: 160, image: "/api/placeholder/80/80" },
      { id: "sw4", name: "Cinnamon Roll", price: 130, image: "/api/placeholder/80/80" },
    ],
    beverage: [
      { id: "b1", name: "Cappuccino", price: 140, image: "/api/placeholder/80/80" },
      { id: "b2", name: "Latte", price: 150, image: "/api/placeholder/80/80" },
      { id: "b3", name: "Espresso", price: 110, image: "/api/placeholder/80/80" },
      { id: "b4", name: "Matcha Latte", price: 170, image: "/api/placeholder/80/80" },
      { id: "b5", name: "Iced Coffee", price: 130, image: "/api/placeholder/80/80" },
    ],
  };
// Component for the cafe map
const CafeMap = ({ selectedSeat, onSeatSelect, unavailableSeats, currentTime }: CafeMapProps) => {
  const isSeatAvailable = (seatId: string): boolean => {
    if (!unavailableSeats[seatId]) return true;
    return !unavailableSeats[seatId].includes(currentTime);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '600px', // Reduced from 800px
      height: '400px', // Increased from 350px for better proportions
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      background: '#f8fafc',
      padding: '1rem',
      marginBottom: '1.5rem',
      margin: '0 auto'
    }}>
      {/* Cafe Outline */}
      <div style={{
        position: 'absolute',
        inset: '1rem',
        border: '2px solid #cbd5e1',
        borderRadius: '0.5rem'
      }}>
        {/* Entrance */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4rem',
          height: '0.5rem',
          background: '#94a3b8'
        }}>
          <div style={{
            position: 'absolute',
            top: '-1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.75rem',
            color: '#64748b'
          }}>
            Entrance
          </div>
        </div>

        {/* Kitchen Area */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10rem', // Slightly reduced
          height: '5rem', // Slightly reduced
          background: '#e2e8f0',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Kitchen</span>
        </div>

        {/* Long Table (Window Side) */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '3.5rem',
          height: '12rem',
          background: '#f1f5f9',
          borderRadius: '0.375rem',
          border: '1px solid #cbd5e1'
        }}>
          <div style={{
            position: 'absolute',
            top: '-1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.75rem',
            color: '#64748b'
          }}>
            Window
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(90deg)',
            fontSize: '0.75rem',
            color: '#64748b',
            whiteSpace: 'nowrap'
          }}>
            Long Table
          </div>

          {/* Long Table Seats */}
          {[1, 2, 3, 4].map((seatNum, index) => {
            const seatId = `long-table-seat${seatNum}`;
            const isAvailable = isSeatAvailable(seatId);
            const isSelected = selectedSeat === seatId;
            const topPosition = index * 25 + 30; // Adjusted spacing

            return (
              <div
                key={seatId}
                onClick={() => isAvailable && onSeatSelect(seatId)}
                style={{
                  position: 'absolute',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  left: '-1rem',
                  top: `${topPosition}px`,
                  transform: 'translateX(-50%)',
                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                  background: isSelected ? colors.burgundy : isAvailable ? '#e2e8f0' : '#fecaca',
                  color: isSelected ? 'white' : 'black',
                  opacity: isAvailable ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  transition: 'all 0.3s ease',
                }}
              >
                {seatNum}
              </div>
            );
          })}
        </div>

        {/* 4-Seater Tables */}
        {[1, 2].map((tableNum) => {
          // Position tables on the left side with better spacing
          const tableTop = tableNum === 1 ? '30%' : '65%';
          
          return (
            <div
              key={`table${tableNum}`}
              style={{
                position: 'absolute',
                width: '5rem',
                height: '5rem',
                background: '#f1f5f9',
                borderRadius: '0.375rem',
                border: '1px solid #cbd5e1',
                top: tableTop,
                left: '25%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Table {tableNum}
              </div>

              {/* Table Seats */}
              {[
                { num: 1, top: '-1rem', left: '50%', transform: 'translate(-50%, -50%)' },
                { num: 2, top: '50%', left: '-1rem', transform: 'translate(-50%, -50%)' },
                { num: 3, top: '50%', right: '-1rem', transform: 'translate(50%, -50%)' },
                { num: 4, bottom: '-1rem', left: '50%', transform: 'translate(-50%, 50%)' },
              ].map((seat) => {
                const seatId = `table${tableNum}-seat${seat.num}`;
                const isAvailable = isSeatAvailable(seatId);
                const isSelected = selectedSeat === seatId;

                return (
                  <div
                    key={seatId}
                    onClick={() => isAvailable && onSeatSelect(seatId)}
                    style={{
                      position: 'absolute',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      top: seat.top,
                      left: seat.left,
                      right: seat.right,
                      bottom: seat.bottom,
                      transform: seat.transform,
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                      background: isSelected ? colors.burgundy : isAvailable ? '#e2e8f0' : '#fecaca',
                      color: isSelected ? 'white' : 'black',
                      opacity: isAvailable ? 1 : 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {seat.num}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.75rem',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '0.75rem', height: '0.75rem', background: '#e2e8f0', borderRadius: '50%' }}></div>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '0.75rem', height: '0.75rem', background: '#fecaca', opacity: 0.5, borderRadius: '50%' }}></div>
          <span>Unavailable</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '0.75rem', height: '0.75rem', background: colors.burgundy, borderRadius: '50%' }}></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};  

  // Component for the date picker
  const DatePicker = ({ date, onDateChange }: DatePickerProps) => {
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    // Simple calendar rendering
    const renderCalendar = () => {
      const today = new Date();
      const currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

      // Get days in month
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

      // Get day of week of first day (0 = Sunday, 1 = Monday, etc.)
      const firstDayOfMonth = currentMonth.getDay();

      // Create array of day numbers
      const days: (number | null)[] = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null); // Empty cells for days before the 1st
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }

      const formatDateDisplay = (date: Date): string => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      };

      return (
        <div style={{
          position: 'absolute',
          zIndex: 10,
          top: '100%',
          left: 0,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          padding: '0.5rem',
          width: '20rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.burgundy }}
              onClick={() => onDateChange(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
            >
              &#8592;
            </button>
            <span>{`${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}</span>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.burgundy }}
              onClick={() => onDateChange(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
            >
              &#8594;
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
              <div key={`header-${index}`} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.75rem' }}>
                {day}
              </div>
            ))}

            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />;
              }

              const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
              const isSelected = day === date.getDate();
              const isPast = dayDate < today && !(dayDate.getDate() === today.getDate() &&
                dayDate.getMonth() === today.getMonth() &&
                dayDate.getFullYear() === today.getFullYear());

              return (
                <div
                  key={`day-${index}`}
                  style={{
                    width: '2rem',
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isPast ? 'not-allowed' : 'pointer',
                    background: isSelected ? colors.burgundy : 'transparent',
                    color: isPast ? '#cbd5e1' : isSelected ? 'white' : 'inherit',
                    borderRadius: '50%',
                    opacity: isPast ? 0.5 : 1,
                  }}
                  onClick={() => {
                    if (!isPast) {
                      onDateChange(new Date(date.getFullYear(), date.getMonth(), day));
                      setShowCalendar(false);
                    }
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.5rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.25rem',
            background: 'white',
            color: date ? 'black' : '#94a3b8',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>📅</span>
          {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Pick a date"}
        </button>

        {showCalendar && renderCalendar()}
      </div>
    );
  };

  // Component for the time picker
  const TimePicker = ({ time, onTimeChange }: TimePickerProps) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    // Generate time options from 9:00 to 20:00 (cafe hours)
    const timeOptions: string[] = [];
    for (let hour = 9; hour <= 20; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      timeOptions.push(`${formattedHour}:00`);
      if (hour < 20) {
        timeOptions.push(`${formattedHour}:30`);
      }
    }

    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.5rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.25rem',
            background: 'white',
            color: time ? 'black' : '#94a3b8',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>🕒</span>
          {time || "Select time"}
        </button>

        {showOptions && (
          <div style={{
            position: 'absolute',
            zIndex: 10,
            top: '100%',
            left: 0,
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '16rem',
            maxHeight: '16rem',
            overflowY: 'auto',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {timeOptions.map((timeOption) => (
                <button
                  key={timeOption}
                  style={{
                    padding: '0.375rem',
                    border: time === timeOption ? 'none' : '1px solid #e2e8f0',
                    borderRadius: '0.25rem',
                    background: time === timeOption ? colors.burgundy : 'white',
                    color: time === timeOption ? 'white' : 'black',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onTimeChange(timeOption);
                    setShowOptions(false);
                  }}
                >
                  {timeOption}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Component for food order section
  const FoodOrderSection = ({ foodOrder, onOrderChange }: FoodOrderSectionProps) => {
    const [activeTab, setActiveTab] = useState<string>("savoury");

    const addItemToOrder = (category: string, item: MenuItem): void => {
      const existingItemIndex = foodOrder[category as keyof FoodOrder].findIndex((i) => i.id === item.id);

      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedItems = [...foodOrder[category as keyof FoodOrder]];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + 1,
        };
        onOrderChange(category, updatedItems);
      } else {
        // Add new item with quantity 1
        onOrderChange(category, [...foodOrder[category as keyof FoodOrder], { ...item, quantity: 1 }]);
      }
    };

    const removeItemFromOrder = (category: string, itemId: string): void => {
      const existingItemIndex = foodOrder[category as keyof FoodOrder].findIndex((i) => i.id === itemId);

      if (existingItemIndex >= 0) {
        const item = foodOrder[category as keyof FoodOrder][existingItemIndex];

        if (item.quantity && item.quantity > 1) {
          // Decrement quantity
          const updatedItems = [...foodOrder[category as keyof FoodOrder]];
          updatedItems[existingItemIndex] = {
            ...item,
            quantity: item.quantity - 1,
          };
          onOrderChange(category, updatedItems);
        } else {
          // Remove item
          onOrderChange(
            category,
            foodOrder[category as keyof FoodOrder].filter((i) => i.id !== itemId),
          );
        }
      }
    };

    const deleteItemFromOrder = (category: string, itemId: string): void => {
      onOrderChange(
        category,
        foodOrder[category as keyof FoodOrder].filter((i) => i.id !== itemId),
      );
    };

    const getTotalItems = (): number => {
      return foodOrder.savoury.length + foodOrder.sweet.length + foodOrder.beverage.length;
    };

    return (
      <div>
        {/* Tabs navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
          {[
            { id: "savoury", label: "Savoury" },
            { id: "sweet", label: "Sweet" },
            { id: "beverage", label: "Beverage" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.25rem',
                background: activeTab === tab.id ? colors.burgundy : 'white',
                color: activeTab === tab.id ? 'white' : 'black',
                border: activeTab === tab.id ? 'none' : '1px solid #e2e8f0',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {tab.label}
              {foodOrder[tab.id as keyof FoodOrder].length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '-0.5rem',
                  background: colors.orange,
                  color: 'white',
                  borderRadius: '50%',
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                }}>
                  {foodOrder[tab.id as keyof FoodOrder].length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{
          height: '200px',
          overflowY: 'auto',
          paddingRight: '1rem',
          marginBottom: '1rem',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          padding: '0.5rem',
        }}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {MENU_ITEMS[activeTab].map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.25rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: '#f1f5f9',
                  borderRadius: '0.25rem',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}></div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Rs. {item.price}</p>
                </div>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.5rem',
                    height: '1.5rem',
                    border: 'none',
                    borderRadius: '50%',
                    background: 'transparent',
                    color: colors.burgundy,
                    cursor: 'pointer',
                  }}
                  onClick={() => addItemToOrder(activeTab, item)}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        {getTotalItems() > 0 && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
            <h3 style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Your Order</h3>
            <div style={{
              height: '120px',
              overflowY: 'auto',
              paddingRight: '1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.5rem',
            }}>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {["savoury", "sweet", "beverage"].map((category) =>
                  foodOrder[category as keyof FoodOrder].map((item) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.875rem',
                      padding: '0.5rem',
                      background: '#f1f5f9',
                      borderRadius: '0.25rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          background: '#e2e8f0',
                          borderRadius: '0.25rem',
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}></div>
                        <span>{item.name}</span>
                        <span style={{ color: '#64748b' }}>Rs. {item.price}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                          style={{
                            height: '1.5rem',
                            width: '1.5rem',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            color: colors.burgundy,
                            cursor: 'pointer',
                          }}
                          onClick={() => removeItemFromOrder(category, item.id)}
                        >
                          -
                        </button>
                        <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
                        <button
                          style={{
                            height: '1.5rem',
                            width: '1.5rem',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            color: colors.burgundy,
                            cursor: 'pointer',
                          }}
                          onClick={() => addItemToOrder(category, item)}
                        >
                          +
                        </button>
                        <button
                          style={{
                            height: '1.5rem',
                            width: '1.5rem',
                            padding: 0,
                            marginLeft: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                          }}
                          onClick={() => deleteItemFromOrder(category, item.id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Component for booking summary
  const BookingSummary = ({ date, time, slotLength, selectedSeat, foodOrder, totalPrice }: BookingSummaryProps) => {
    const formatSeatName = (seatId: string | null): string => {
      if (!seatId) return "No seat selected";

      // Convert "table1-seat2" to "Table 1, Seat 2"
      return seatId
        .replace(/table(\d+)-seat(\d+)/, "Table $1, Seat $2")
        .replace(/long-table-seat(\d+)/, "Long Table, Seat $1");
    };

    const calculateSubtotal = (): number => {
      const itemPrices = [
        ...foodOrder.savoury.map((item) => item.price * (item.quantity || 1)),
        ...foodOrder.sweet.map((item) => item.price * (item.quantity || 1)),
        ...foodOrder.beverage.map((item) => item.price * (item.quantity || 1)),
      ];

      return itemPrices.reduce((sum, price) => sum + price, 0);
    };

    const subtotal = calculateSubtotal();
    const bookingFee = 200;

    const formatDate = (date: Date | null): string => {
      if (!date) return "Not selected";
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <h3 style={{ fontWeight: 500 }}>Booking Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div style={{ color: '#64748b' }}>Date:</div>
            <div>{formatDate(date)}</div>

            <div style={{ color: '#64748b' }}>Time:</div>
            <div>{time}</div>

            <div style={{ color: '#64748b' }}>Duration:</div>
            <div>
              {slotLength} {Number.parseInt(slotLength) === 1 ? "Hour" : "Hours"}
            </div>

            <div style={{ color: '#64748b' }}>Seat:</div>
            <div>{formatSeatName(selectedSeat)}</div>
          </div>
        </div>

        {(foodOrder.savoury.length > 0 || foodOrder.sweet.length > 0 || foodOrder.beverage.length > 0) && (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <h3 style={{ fontWeight: 500 }}>Food Order</h3>
            <div style={{ display: 'grid', gap: '0.25rem', fontSize: '0.875rem' }}>
              {foodOrder.savoury.length > 0 && (
                <div>
                  <div style={{ fontWeight: 500 }}>Savoury</div>
                  <ul style={{ paddingLeft: '1rem' }}>
                    {foodOrder.savoury.map((item) => (
                      <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            borderRadius: '0.25rem',
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}></div>
                          <span>
                            {item.name} x{item.quantity || 1}
                          </span>
                        </div>
                        <span>Rs. {item.price * (item.quantity || 1)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {foodOrder.sweet.length > 0 && (
                <div>
                  <div style={{ fontWeight: 500 }}>Sweet</div>
                  <ul style={{ paddingLeft: '1rem' }}>
                    {foodOrder.sweet.map((item) => (
                      <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            borderRadius: '0.25rem',
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}></div>
                          <span>
                            {item.name} x{item.quantity || 1}
                          </span>
                        </div>
                        <span>Rs. {item.price * (item.quantity || 1)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {foodOrder.beverage.length > 0 && (
                <div>
                  <div style={{ fontWeight: 500 }}>Beverage</div>
                  <ul style={{ paddingLeft: '1rem' }}>
                    {foodOrder.beverage.map((item) => (
                      <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            borderRadius: '0.25rem',
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}></div>
                          <span>
                            {item.name} x{item.quantity || 1}
                          </span>
                        </div>
                        <span>Rs. {item.price * (item.quantity || 1)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '0.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <h3 style={{ fontWeight: 500 }}>Payment Summary</h3>
          <div style={{ display: 'grid', gap: '0.25rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Food & Beverage Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Booking Fee</span>
              <span>Rs. {bookingFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0', marginTop: '0.5rem' }}>
              <span>Total</span>
              <span>Rs. {totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Booking Hero */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/iced%20spanish%20latte.jpg)`, backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Book a Spot at Yuka</h1>
          <p style={{ fontSize: '1.2rem' }}>Reserve your table and pre-order your favorite drinks and snacks</p>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', background: colors.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {step === "select" && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem'
            }}>
              {/* Seat Selection and Date/Time Card */}
              <div style={{
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Select Your Seat</h2>
                  <p style={{ color: '#64748b' }}>Choose an available seat from our cafe layout</p>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <CafeMap
                    selectedSeat={selectedSeat}
                    onSeatSelect={handleSeatSelect}
                    unavailableSeats={unavailableSeats}
                    currentTime={time}
                  />

                  {selectedSeat && (
                    <div style={{
                      display: 'inline-block',
                      background: '#f1f5f9',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      marginBottom: '1rem'
                    }}>
                      Selected: {selectedSeat.replace(/-/g, " ")}
                    </div>
                  )}

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1.5rem',
                    marginTop: '1.5rem'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Select Date</h3>
                      <DatePicker date={date} onDateChange={setDate} />
                    </div>

                    <div>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Select Time</h3>
                      <TimePicker time={time} onTimeChange={setTime} />
                    </div>

                    <div>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Slot Length</h3>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={slotLength}
                          onChange={(e) => setSlotLength(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.5rem 1rem',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.25rem',
                            background: 'white',
                            appearance: 'none',
                            fontSize: '0.875rem',
                          }}
                        >
                          <option value="1">1 Hour</option>
                          <option value="2">2 Hours</option>
                        </select>
                        <div style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Food Order Card */}
              <div style={{
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Your Order</h2>
                  <p style={{ color: '#64748b' }}>Add items to your order (optional)</p>
                </div>

                <div style={{ padding: '1.5rem', flex: 1 }}>
                  <FoodOrderSection foodOrder={foodOrder} onOrderChange={handleFoodOrderChange} />
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                  <button
                    onClick={handleProceedToBook}
                    disabled={!selectedSeat}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: selectedSeat ? colors.burgundy : '#e2e8f0',
                      color: selectedSeat ? 'white' : '#94a3b8',
                      border: 'none',
                      borderRadius: '0.25rem',
                      fontWeight: 500,
                      cursor: selectedSeat ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Proceed to Book
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "review" && (
            <div style={{
              maxWidth: '32rem',
              margin: '0 auto',
              background: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Review Your Booking</h2>
                <p style={{ color: '#64748b' }}>Please confirm your booking details</p>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <BookingSummary
                  date={date}
                  time={time}
                  slotLength={slotLength}
                  selectedSeat={selectedSeat}
                  foodOrder={foodOrder}
                  totalPrice={getTotalPrice()}
                />
              </div>

              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => setStep("select")}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'white',
                    color: colors.burgundy,
                    border: `1px solid ${colors.burgundy}`,
                    borderRadius: '0.25rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Back
                </button>

                <button
                  onClick={handleConfirmBooking}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: colors.burgundy,
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Confirm Booking (Rs. {getTotalPrice()})
                </button>
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div style={{
              maxWidth: '32rem',
              margin: '0 auto',
              background: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Booking Confirmed!</h2>
                <p style={{ color: '#64748b' }}>Your spot at Yuka has been reserved</p>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ marginBottom: '1rem', color: '#10b981' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ margin: '0 auto' }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>Thank you for your booking!</h3>
                  <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                    We look forward to serving you on {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {time}
                  </p>
                  <p style={{ fontWeight: 500 }}>
                    Booking Reference: YK-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </p>
                </div>
              </div>

              <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                <button
                  onClick={() => setStep("select")}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: colors.burgundy,
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Book Another Spot
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// Component for the Header that appears on all pages
const Header = ({ currentPage, setCurrentPage, colors }: HeaderProps) => {
  return (
    <header style={{ background: colors.burgundy, padding: '1rem', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setCurrentPage('home')}
        >
          {/* Use your actual logo path here */}
          <img src="/images/yuka%20logo.jpeg" alt="Yuka Coffee" style={{ height: '40px', width: 'auto' }} />
          <h1 style={{ marginLeft: '0.5rem', color: colors.cream, fontSize: '1.5rem', fontWeight: 'bold' }}>YUKA COFFEE</h1>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button
            onClick={() => setCurrentPage('home')}
            style={{
              color: colors.cream,
              textDecoration: 'none',
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: currentPage === 'home' ? `2px solid ${colors.orange}` : 'none',
              paddingBottom: '3px',
              background: 'transparent',
              border: 'none'
            }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            style={{
              color: colors.cream,
              textDecoration: 'none',
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: currentPage === 'about' ? `2px solid ${colors.orange}` : 'none',
              paddingBottom: '3px',
              background: 'transparent',
              border: 'none'
            }}
          >
            About
          </button>
          <button
            onClick={() => setCurrentPage('menu')}
            style={{
              color: colors.cream,
              textDecoration: 'none',
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: currentPage === 'menu' ? `2px solid ${colors.orange}` : 'none',
              paddingBottom: '3px',
              background: 'transparent',
              border: 'none'
            }}
          >
            Menu
          </button>
          <button
            onClick={() => setCurrentPage('blog')}
            style={{
              color: colors.cream,
              textDecoration: 'none',
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: currentPage === 'blog' ? `2px solid ${colors.orange}` : 'none',
              paddingBottom: '3px',
              background: 'transparent',
              border: 'none'
            }}
          >
            Blog
          </button>
          <button
            onClick={() => setCurrentPage('booking')}
            style={{
              color: colors.cream,
              textDecoration: 'none',
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: currentPage === 'booking' ? `2px solid ${colors.orange}` : 'none',
              paddingBottom: '3px',
              background: 'transparent',
              border: 'none'
            }}
          >
            Book a Spot
          </button>
        </div>
        <button style={{
          background: colors.orange,
          color: colors.black,
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '4px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}>
          ORDER NOW <ExternalLink size={16} />
        </button>
      </div>
    </header>
  );
};

// Component for the Footer that appears on all pages
const Footer = ({ setCurrentPage, colors }: FooterProps) => {
  return (
    <footer style={{ background: colors.black, color: colors.cream, padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Coffee size={24} color={colors.orange} />
              <h1 style={{ marginLeft: '0.5rem', color: colors.cream, fontSize: '1.2rem', fontWeight: 'bold' }}>YUKA COFFEE</h1>
            </div>
            <p style={{ lineHeight: 1.6 }}>Elevating coffee culture in Karachi with our passion for exceptional brews</p>
          </div>

          <div style={{ minWidth: '200px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: colors.orange }}>Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setCurrentPage('home')} style={{ color: colors.cream, textDecoration: 'none', cursor: 'pointer', background: 'transparent', border: 'none' }}>Home</button>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setCurrentPage('about')} style={{ color: colors.cream, textDecoration: 'none', cursor: 'pointer', background: 'transparent', border: 'none' }}>About</button>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setCurrentPage('menu')} style={{ color: colors.cream, textDecoration: 'none', cursor: 'pointer', background: 'transparent', border: 'none' }}>Menu</button>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setCurrentPage('blog')} style={{ color: colors.cream, textDecoration: 'none', cursor: 'pointer', background: 'transparent', border: 'none' }}>Blog</button>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setCurrentPage('booking')} style={{ color: colors.cream, textDecoration: 'none', cursor: 'pointer', background: 'transparent', border: 'none' }}>Book a Spot</button>
              </li>
            </ul>
          </div>

          <div style={{ minWidth: '200px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: colors.orange }}>Contact</h3>
            <p style={{ marginBottom: '0.5rem' }}>Maskan, Karachi</p>
            <p style={{ marginBottom: '0.5rem' }}>info@yukacoffee.pk</p>
            <p style={{ marginBottom: '1rem' }}>+92 300 1234567</p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com" style={{ color: colors.cream }}><Instagram size={20} /></a>
              <a href="https://facebook.com" style={{ color: colors.cream }}><Facebook size={20} /></a>
              <a href="https://twitter.com" style={{ color: colors.cream }}><Twitter size={20} /></a>
            </div>
          </div>

          <div style={{ minWidth: '200px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: colors.orange }}>Order Now</h3>
            <p style={{ marginBottom: '1rem' }}>Get Yuka Coffee delivered straight to your doorstep</p>
            <button style={{
              background: colors.orange,
              color: colors.black,
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}>
              Order via Foodpanda <ExternalLink size={16} />
            </button>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${colors.taupe}`, paddingTop: '2rem', textAlign: 'center' }}>
          <p>© 2025 Yuka Coffee. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage, colors }: PageProps) => {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/espresso.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '8rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Elevate Your Coffee Experience</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Handcrafted beverages made with passion in the heart of Karachi</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: colors.orange,
              color: colors.black,
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '4px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              ORDER NOW
            </button>
            <button
              onClick={() => setCurrentPage('booking')}
              style={{
                background: 'transparent',
                color: 'white',
                border: `2px solid white`,
                padding: '1rem 2rem',
                borderRadius: '4px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
              Book a Table
            </button>
          </div>
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section style={{ padding: '5rem 2rem', background: colors.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: colors.burgundy }}>Featured Drinks</h2>
            <button
              onClick={() => setCurrentPage('menu')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: 'none',
                color: colors.burgundy,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              View Full Menu <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Menu Item Preview */}
            <div style={{ width: '300px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                background: `url(/images/hazelnut%20frappe.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: colors.burgundy }}>Hazelnut Frappe</h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  Smooth espresso blended with ice, milk, and rich hazelnut flavor
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold' }}>350 Rs</span>
                  <button style={{
                    background: colors.orange,
                    color: colors.black,
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Order Now
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Item Preview */}
            <div style={{ width: '300px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(/images/coconut%20creme.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: colors.burgundy }}>Coconut Crème</h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  Tropical coconut flavor blended with our signature espresso
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold' }}>400 Rs</span>
                  <button style={{
                    background: colors.orange,
                    color: colors.black,
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section style={{ padding: '5rem 2rem', background: colors.taupe }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: colors.burgundy }}>Latest From Our Blog</h2>
            <button
              onClick={() => setCurrentPage('blog')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: 'none',
                color: colors.burgundy,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              View All Articles <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Blog Post Preview */}
            <div style={{ width: '350px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                background: `url(/images/cortado.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  background: colors.orange,
                  color: 'white',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  Brewing Guides
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: colors.burgundy }}>
                  The Complete Guide to Coffee Brewing Methods
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.taupe }}>May 10, 2025</span>
                  <button
                    onClick={() => setCurrentPage('blogPost')}
                    style={{
                      color: colors.burgundy,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location and Booking section */}
      <section style={{ padding: '5rem 2rem', background: colors.burgundy, color: colors.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Visit Us</h2>
          <p style={{ marginBottom: '2rem' }}>Experience our coffee in person</p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <MapPin size={24} color={colors.orange} />
                <div style={{ marginLeft: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>Maskan, Karachi</h3>
                  <p>Near Haroon Centre, Abul Hasan Isphahani Road</p>
                </div>
              </div>

              <h4 style={{ marginBottom: '0.5rem', color: colors.orange }}>Hours</h4>
              <p style={{ marginBottom: '0.3rem' }}>Monday - Friday: 8:00 AM - 10:00 PM</p>
              <p style={{ marginBottom: '1.5rem' }}>Saturday - Sunday: 9:00 AM - 11:00 PM</p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button style={{
                  background: colors.orange,
                  color: colors.black,
                  border: 'none',
                  padding: '0.8rem 2rem',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Order via Foodpanda
                </button>

                <button
                  onClick={() => setCurrentPage('booking')}
                  style={{
                    background: 'transparent',
                    color: colors.cream,
                    border: `2px solid ${colors.cream}`,
                    padding: '0.8rem 2rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Reserve a Table
                </button>
              </div>
            </div>

            <div style={{
              flex: 1,
              minWidth: '300px',
              height: '300px',
              background: `url(/api/placeholder/500/300)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}></div>
          </div>
        </div>
      </section>
    </>
  );
};

// About Page Component
const AboutPage = ({ colors }: { colors: Colors }) => {
  return (
    <>
      {/* About Hero */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/cappucino.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Our Story</h1>
          <p style={{ fontSize: '1.2rem' }}>Discover the passion behind Yuka Coffee</p>
        </div>
      </section>

      {/* About Content */}
      <section style={{ padding: '5rem 2rem', background: colors.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{
                background: `url(/images/americano.jpg)`,
                height: '400px',
                borderRadius: '8px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: `8px 8px 0 ${colors.orange}`
              }}></div>
            </div>

            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.5rem', color: colors.burgundy, marginBottom: '1.5rem' }}>Our Journey</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                At Yuka Coffee, we believe in the transformative power of a perfectly crafted cup.
                Our journey began with a simple passion for exceptional coffee and a desire to create
                a space where coffee lovers could experience the finest brews in Karachi.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                Every cup we serve celebrates the rich traditions of coffee culture while
                embracing innovative techniques that elevate the experience beyond the ordinary.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                We source our beans from sustainable farms around the world, ensuring that each
                batch maintains the highest quality while supporting ethical farming practices.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: colors.burgundy, marginBottom: '1.5rem', textAlign: 'center' }}>Our Values</h2>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
              {/* Value 1 */}
              <div style={{ width: '300px', background: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: colors.burgundy }}>Quality</h3>
                <p style={{ color: colors.black, lineHeight: 1.6 }}>
                  We never compromise on the quality of our ingredients, ensuring that every cup
                  meets our exacting standards from bean to brew.
                </p>
              </div>

              {/* Value 2 */}
              <div style={{ width: '300px', background: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: colors.burgundy }}>Community</h3>
                <p style={{ color: colors.black, lineHeight: 1.6 }}>
                  We believe in creating a welcoming space for people to gather, connect, and
                  share moments over exceptional coffee.
                </p>
              </div>

              {/* Value 3 */}
              <div style={{ width: '300px', background: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: colors.burgundy }}>Sustainability</h3>
                <p style={{ color: colors.black, lineHeight: 1.6 }}>
                  We're committed to environmentally responsible practices, from eco-friendly
                  packaging to supporting sustainable coffee farming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

// Menu Page Component with real menu data
const MenuPage = ({ colors }: { colors: Colors }) => {
  // Menu data organized by categories
  interface MenuItem {
    name: string;
    price: string;
    description: string;
    popular?: boolean;
    image?: string;
  }

  interface MenuData {
    popular: MenuItem[];
    hot: MenuItem[];
    iced: MenuItem[];
    frappe: MenuItem[];
    drip: MenuItem[];
    hotChocolate: MenuItem[];
    icedTea: MenuItem[];
    special: MenuItem[];
    dessertBar: MenuItem[];
  }

  const menuData: MenuData = {
    popular: [
      {
        name: "Iced Spanish Latte",
        price: "600",
        description: "A chilled fusion of espresso, iced milk, and sweetened condensed milk for a rich, creamy, and slightly sweet treat.",
        image: "/images/iced%20spanish%20latte.jpg"
      },
      {
        name: "Salted Caramel Frappe",
        price: "690",
        description: "Sweet caramel with a dash of sea salt, chilled to perfection for a bold, satisfying flavor.",
        image: "/images/salted%20caramel%20frappe.jpg"
      },
      {
        name: "Mocha Frappe",
        price: "690",
        description: "A Blended drink made with chocolate, coffee, milk, ice, and whipped cream.",
        image: "/images/mocha%20frappe.jpg"
      },
      {
        name: "Iced Italian Vanilla Latte",
        price: "620",
        description: "A refreshing blend of espresso, iced milk, and smooth vanilla, creating a sweet, aromatic, and cooling coffee experience.",
        image: "/images/iced%20italian%20vanilla%20latte.jpg"
      },
      {
        name: "Iced Turk Hazelnut Latte",
        price: "650",
        description: "A cool and nutty latte made with iced espresso, milk, and hazelnut flavor, delivering a refreshing and indulgent hazelnut kick.",
        image: "/images/iced%20turk%20hazelnut%20latte.jpg"
      },
      {
        name: "Caramel Frappe",
        price: "690",
        description: "A delightful, chilled beverage that combines the rich flavors of coffee and caramel, blended with ice to create a creamy, slushy texture.",
        image: "/images/caramel%20latte.jpg"
      }
    ],
    hot: [
      {
        name: "Espresso",
        price: "320-400",
        description: "Espresso is a strong, concentrated coffee made by forcing hot water through finely-ground coffee, offering a bold, rich flavor.",
        image: "/images/espresso.jpg"
      },
      {
        name: "Americano",
        price: "320-400",
        description: "An Americano is a strong, smooth coffee made by diluting espresso with hot water, offering a rich flavor.",
        image: "/images/americano.jpg"
      },
      {
        name: "Cortado",
        price: "360-450",
        description: "A balanced coffee drink made with equal parts espresso and steamed milk offering a strong espresso flavor with a smooth creamy texture. Its a perfect choice for those who enjoy a less frothy more intense coffee experience. A short beverage.",
        image: "/images/cortado.jpg"
      },
      {
        name: "Cappucino",
        price: "432-540",
        description: "A classic coffee drink made with equal parts espresso, steamed milk, and frothy milk foam, creating a rich, bold flavor with a creamy texture and a velvety finish.",
        image: "/images/cappucino.jpg"
      },
      {
        name: "Latte",
        price: "432-540",
        description: "A smooth and creamy coffee drink made with espresso and steamed milk, topped with a light layer of froth, offering a balanced and mild coffee flavor."
      },
      {
        name: "Spanish Latte",
        price: "480-600",
        description: "Strong And creamy blend of espresso, steamed milk, and sweetened condensed milk, offering a smooth, indulgent flavor with a touch of caramel sweetness."
      },
      {
        name: "Mocha Latte",
        price: "480-600",
        description: "A perfect combination of rich espresso, creamy steamed milk, and smooth chocolate syrup, creating a deliciously sweet and velvety coffee experience."
      },
      {
        name: "Coconut Creme",
        price: "480-600",
        description: "Coconut Creme hot coffee is a creamy, tropical-inspired blend, combining rich coffee with smooth coconut flavor for a silky, indulgent sip with a hint of sweetness.",
        image: "/images/coconut%20creme.jpg"
      },
      {
        name: "Italian Vanilla Latte",
        price: "496-620",
        description: "A smooth blend of espresso, steamed milk, and sweet vanilla syrup, creating a creamy and lightly sweetened coffee experience."
      },
      {
        name: "White Double Shot Mocha",
        price: "496-620",
        description: "A rich and decadent blend of espresso, velvety white chocolate, and steamed milk, delivering a bold yet smooth flavor with a sweet, creamy finish"
      },
      {
        name: "Salted Caramel",
        price: "464-580",
        description: "Salted caramel hot coffee is a smooth, indulgent blend of rich coffee and creamy caramel, enhanced with a touch of salt for a perfectly balanced sweet and savory flavor."
      },
      {
        name: "Caramel Latte",
        price: "464-580",
        description: "A hot caramel latte is a delightful espresso-based beverage that combines the rich, robust flavor of espresso with the sweet, buttery notes of caramel, all enveloped in steamed milk.",
        image: "/images/caramel%20latte.jpg"
      },
      {
        name: "Turk Hazelnut Latte",
        price: "520-650",
        description: "Hazelnut hot coffee is a rich and cozy blend of smooth coffee with the warm, nutty sweetness of hazelnut, offering a creamy and comforting flavor in every sip."
      }
    ],
    iced: [
      {
        name: "Iced Latte",
        price: "540",
        description: "A refreshing blend of rich espresso and chilled, velvety milk over ice, offering a smooth and invigorating coffee experience."
      },
      {
        name: "Iced Coconut Creme Latte",
        price: "600",
        description: "A chilled, creamy fusion of espresso, iced milk, and coconut cream, offering a refreshing tropical twist to your coffee break.",
        image: "/images/coconut%20creme.jpg"
      },
      {
        name: "Iced Spanish Latte",
        price: "600",
        description: "A chilled fusion of espresso, iced milk, and sweetened condensed milk for a rich, creamy, and slightly sweet treat.",
        popular: true,
        image: "/images/iced%20spanish%20latte.jpg"
      },
      {
        name: "Iced Italian Vanilla Latte",
        price: "620",
        description: "A refreshing blend of espresso, iced milk, and smooth vanilla, creating a sweet, aromatic, and cooling coffee experience.",
        popular: true,
        image: "/images/iced%20italian%20vanilla%20latte.jpg"
      },
      {
        name: "Iced Mocha",
        price: "630",
        description: "A cold and creamy mix of espresso, iced chocolate, and milk, delivering a refreshing, sweet, and smooth mocha flavor."
      },
      {
        name: "Iced Salted Caramel Latte",
        price: "650",
        description: "A cool and creamy mix of espresso, iced milk, and salted caramel syrup, delivering a sweet and savory iced indulgence."
      },
      {
        name: "Iced Doubleshot White Mocha",
        price: "620",
        description: "A chilled, indulgent combination of double espresso shots, iced white chocolate, and milk, topped with whipped cream for extra sweetness."
      },
      {
        name: "Iced Americano",
        price: "440",
        description: "Iced Americano is pouring hot coffee shot over ice"
      },
      {
        name: "Iced Turk Hazelnut Latte",
        price: "650",
        description: "A cool and nutty latte made with iced espresso, milk, and hazelnut flavor, delivering a refreshing and indulgent hazelnut kick.",
        popular: true,
        image: "/images/iced%20turk%20hazelnut%20latte.jpg"
      },
      {
        name: "Ice Caramel Lattee",
        price: "650",
        description: "A Refreshing coffee beverage that combines the robust flavor of espresso with the sweet, buttery notes of caramel, all served chilled over ice."
      }
    ],
    frappe: [
      {
        name: "Salted Caramel Frappe",
        price: "690",
        description: "Sweet caramel with a dash of sea salt, chilled to perfection for a bold, satisfying flavor.",
        popular: true,
        image: "/images/salted%20caramel%20frappe.jpg"
      },
      {
        name: "Hazelnut Frappe",
        price: "690",
        description: "A nutty, smooth frappe with toasted hazelnut and creamy ice, perfect for a refreshing sip.",
        image: "/images/hazelnut%20frappe.jpg"
      },
      {
        name: "Vanilla Cloud Frappe",
        price: "690",
        description: "A light, fluffy vanilla frappe, blending sweetness with a creamy, dreamy texture."
      },
      {
        name: "White Double Shot Mocha Frappe",
        price: "690",
        description: "A chilled blend of double espresso and white chocolate, topped with whipped cream for extra luxury."
      },
      {
        name: "Coconut Creme Frappe",
        price: "690",
        description: "A tropical twist with creamy coconut and espresso, chilled to a refreshing perfection."
      },
      {
        name: "Mocha Frappe",
        price: "690",
        description: "A Blended drink made with chocolate, coffee, milk, ice, and whipped cream.",
        popular: true,
        image: "/images/mocha%20frappe.jpg"
      },
      {
        name: "Lindth Mandarin Frappe",
        price: "730",
        description: "A unique blend of Lindt chocolate and zesty mandarin, offering a smooth, citrusy indulgence."
      },
      {
        name: "Choco Dream Frappe",
        price: "730",
        description: "A rich, chocolatey dream, blended with ice for a creamy, decadent treat."
      },
      {
        name: "Caramel Frappe",
        price: "690",
        description: "A delightful, chilled beverage that combines the rich flavors of coffee and caramel, blended with ice to create a creamy, slushy texture.",
        popular: true,
        image: "/images/caramel%20latte.jpg"
      }
    ],
    drip: [
      {
        name: "V60",
        price: "620",
        description: "A perfectly brewed pour-over coffee, offering a clean, smooth flavor with bright, aromatic notes in every sip."
      },
      {
        name: "Iced V60",
        price: "640",
        description: "A refreshing twist on the classic V60, brewed over ice for a crisp, chilled coffee experience with vibrant, clean flavors."
      }
    ],
    hotChocolate: [
      {
        name: "Hot Chocolate",
        price: "580",
        description: "A rich, velvety blend of premium cocoa and creamy milk, delivering a warm and indulgent chocolatey escape with every sip."
      }
    ],
    icedTea: [
      {
        name: "Mandarin Iced Tea",
        price: "440-550",
        description: "A refreshing blend of tangy mandarin and chilled tea, offering a vibrant citrus twist that's both cooling and revitalizing.",
        image: "/images/mandarin%20iced%20tea.jpg"
      },
      {
        name: "Blackberry Iced Tea",
        price: "440-550",
        description: "A delightful infusion of sweet blackberries and smooth iced tea, delivering a fruity and refreshing burst of flavor."
      },
      {
        name: "Hunza Cherry Iced Tea",
        price: "440-550",
        description: "A unique, refreshing blend of ripe cherries and iced tea, with a sweet and slightly tart flavor that's perfect for a summer refreshment"
      }
    ],
    special: [
      {
        name: "Honey Hot Matcha",
        price: "620",
        description: "A warm, velvety matcha embraced by sweet honey, creating a cozy, smooth sip that calms and delights."
      },
      {
        name: "Strawberry Iced Matcha",
        price: "620",
        description: "A vibrant burst of fresh strawberries paired with earthy matcha, served iced for a fruity, refreshing, and energizing treat."
      },
      {
        name: "Vanilla Iced Matcha",
        price: "620",
        description: "Creamy vanilla meets vibrant matcha in this chilled refreshment, offering a perfectly sweet and energizing escape."
      },
      {
        name: "Coconut Iced Matcha",
        price: "620",
        description: "A tropical fusion of matcha and creamy coconut milk, chilled to perfection for a smooth, invigorating, and refreshing experience."
      }
    ],
    dessertBar: [
      {
        name: "Fudge Brownies",
        price: "350",
        description: "Fudge brownies are rich, dense, and decadently chocolatey, with a soft, gooey center and a slightly crisp top, offering a perfect balance of sweetness and deep cocoa flavor.",
        image: "/images/fudge%20brownies.jpg"
      },
      {
        name: "Loaded Chocolate Chunk Cookie",
        price: "390",
        description: "Loaded chocolate chunk cookies NYC-style are thick, chewy cookies packed with generous chunks of rich chocolate, offering a perfect balance of gooey, chocolaty goodness in every bite."
      },
      {
        name: "Double Chocolate Cookie",
        price: "390",
        description: "Double Chocolate Cookies NYC-style are rich, indulgent treats made with a deep chocolate dough and loaded with melty chocolate chunks, delivering a double dose of chocolatey decadence"
      },
      {
        name: "Lotus Biscoff Filled Cookie",
        price: "450",
        description: "Lotus Biscoff NYC cookies are sweet, crunchy treats made with the iconic Biscoff biscuit spread, offering a perfect balance of caramelized, spiced flavor in every delicious bite."
      },
      {
        name: "San Sebastian Cheesecake",
        price: "650",
        description: "San Sebastián cheesecake is a rich, creamy, and slightly burnt cheesecake with a velvety smooth texture. IT features a caramelized, dark top and a soft, custard-like interior, making it irresistibly indulgent."
      }
    ]
  };

  const [activeCategory, setActiveCategory] = useState<string>("popular");

  const categoryLabels: Record<string, string> = {
    popular: "Popular Items",
    hot: "Hot Coffee",
    iced: "Iced Coffee",
    frappe: "Frappes",
    drip: "Drip Coffee",
    hotChocolate: "Hot Chocolate",
    icedTea: "Iced Tea",
    special: "Specialty Drinks",
    dessertBar: "Dessert Bar"
  };

  return (
    <>
      {/* Menu Hero */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/api/placeholder/1200/400)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Our Menu</h1>
          <p style={{ fontSize: '1.2rem' }}>Explore our handcrafted coffee and food selections</p>
        </div>
      </section>

      {/* Category Navigation */}
      <section style={{ padding: '2rem', background: colors.cream, borderBottom: `1px solid ${colors.taupe}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem' }}>
            {Object.keys(categoryLabels).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '0.8rem 1.2rem',
                  borderRadius: '50px',
                  border: activeCategory === category ? 'none' : `2px solid ${colors.burgundy}`,
                  background: activeCategory === category ? colors.burgundy : 'transparent',
                  color: activeCategory === category ? colors.cream : colors.burgundy,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section style={{ padding: '4rem 2rem', background: colors.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', color: colors.burgundy, marginBottom: '2rem', textAlign: 'center' }}>
            {categoryLabels[activeCategory]}
          </h2>

          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {menuData[activeCategory as keyof MenuData].map((item, index) => (
              <div
                key={`${activeCategory}-${index}`}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {item.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: colors.orange,
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Popular
                  </div>
                )}
                <div style={{
                  height: '180px',
                  backgroundImage: `url(${item.image || '/api/placeholder/400/180'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: '1px solid #e2e8f0'  // Add a light border to make sure the container is visible
                }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: colors.burgundy }}>{item.name}</h3>
                    <span style={{ fontWeight: 'bold', color: colors.orange }}>Rs. {item.price}</span>
                  </div>
                  <p style={{ color: colors.black, lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {item.description}
                  </p>
                  <div style={{ marginTop: '1.5rem' }}>
                    <button style={{
                      background: colors.orange,
                      color: colors.black,
                      border: 'none',
                      padding: '0.7rem 1.2rem',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      width: '100%',
                      cursor: 'pointer'
                    }}>
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Blog Page Component
const BlogPage = ({ setCurrentPage, colors }: PageProps) => {
  return (
    <>
      {/* Blog Hero */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/api/placeholder/1200/400)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Coffee Journal</h1>
          <p style={{ fontSize: '1.2rem' }}>Insights, guides, and stories from the world of coffee</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section style={{ padding: '5rem 2rem', background: colors.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Categories */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button style={{
              background: colors.burgundy,
              color: colors.cream,
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              All Categories
            </button>
            <button style={{
              background: 'transparent',
              color: colors.burgundy,
              border: `2px solid ${colors.burgundy}`,
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Brewing Guides
            </button>
            <button style={{
              background: 'transparent',
              color: colors.burgundy,
              border: `2px solid ${colors.burgundy}`,
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Coffee Basics
            </button>
            <button style={{
              background: 'transparent',
              color: colors.burgundy,
              border: `2px solid ${colors.burgundy}`,
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Recipes
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Blog Post 1 */}
            <div style={{ width: '350px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                background: `url(/images/caramel%20latte.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  background: colors.orange,
                  color: 'white',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  Brewing Guides
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: colors.burgundy }}>
                  The Complete Guide to Coffee Brewing Methods
                </h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  Discover the subtle differences between pour-over, French press, espresso, and more brewing techniques.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.taupe }}>May 10, 2025</span>
                  <button
                    onClick={() => setCurrentPage('blogPost')}
                    style={{
                      color: colors.burgundy,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div style={{ width: '350px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                background: `url(/images/mandarin%20iced%20tea.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  background: colors.burgundy,
                  color: 'white',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  Coffee Basics
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: colors.burgundy }}>
                  Understanding Coffee Bean Varieties
                </h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  Learn about the distinct characteristics of Arabica, Robusta, and other coffee bean varieties.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.taupe }}>May 3, 2025</span>
                  <button
                    onClick={() => setCurrentPage('blogPost')}
                    style={{
                      color: colors.burgundy,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div style={{ width: '350px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(/images/mocha%20frappe.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  background: colors.orange,
                  color: 'white',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  Recipes
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: colors.burgundy }}>
                  5 Cold Brew Recipes Perfect for Summer
                </h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  Beat the Karachi heat with these refreshing cold brew variations you can make at home.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.taupe }}>April 25, 2025</span>
                  <button
                    onClick={() => setCurrentPage('blogPost')}
                    style={{
                      color: colors.burgundy,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 4 */}
            <div style={{ width: '350px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(/images/espresso.jpg)`, backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  background: colors.burgundy,
                  color: 'white',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  Coffee Basics
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: colors.burgundy }}>
                  The Art of Coffee Tasting: A Beginner's Guide
                </h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  Learn how to identify different flavor notes and aromas in your coffee like a professional.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.taupe }}>April 15, 2025</span>
                  <button
                    onClick={() => setCurrentPage('blogPost')}
                    style={{
                      color: colors.burgundy,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 5 */}
            <div style={{ width: '350px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(/images/hazelnut%20frappe.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  background: colors.orange,
                  color: 'white',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  Brewing Guides
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: colors.burgundy }}>
                  Perfect Your Home Cold Brew: Tips and Tricks
                </h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  Get the smoothest, richest cold brew at home with our expert brewing guide.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.taupe }}>April 8, 2025</span>
                  <button
                    onClick={() => setCurrentPage('blogPost')}
                    style={{
                      color: colors.burgundy,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 6 */}
            <div style={{ width: '350px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(/images/hazelnut%20frappe.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  background: colors.burgundy,
                  color: 'white',
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.8rem'
                }}>
                  Recipes
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: colors.burgundy }}>
                  Coffee-Infused Desserts to Try at Home
                </h3>
                <p style={{ color: colors.black, marginBottom: '1rem' }}>
                  From tiramisu to chocolate espresso cookies, these coffee-flavored treats are perfect for any occasion.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.taupe }}>April 1, 2025</span>
                  <button
                    onClick={() => setCurrentPage('blogPost')}
                    style={{
                      color: colors.burgundy,
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Blog Post Page Component (Single Post)
const BlogPostPage = ({ setCurrentPage, colors }: PageProps) => {
  return (
    <>
      {/* Blog Post Hero */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/salted%20caramel%20frappe.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: colors.orange,
            color: 'white',
            display: 'inline-block',
            padding: '0.3rem 0.8rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            marginBottom: '0.8rem'
          }}>
            Brewing Guides
          </div>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>The Complete Guide to Coffee Brewing Methods</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Discover the subtle differences between pour-over, French press, espresso, and more brewing techniques</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
            <span>May 10, 2025</span>
            <span>•</span>
            <span>By Ahmed Khan</span>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section style={{ padding: '5rem 2rem', background: colors.cream }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button
            onClick={() => setCurrentPage('blog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: colors.burgundy,
              fontWeight: 'bold',
              marginBottom: '2rem',
              padding: '0',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </button>

          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            fontSize: '1.1rem',
            lineHeight: '1.8'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              For coffee enthusiasts, the brewing method is just as important as the beans themselves.
              Each technique extracts different flavors and aromas from your coffee grounds, creating
              a unique experience in every cup. In this guide, we'll explore the most popular brewing
              methods and help you find the perfect match for your taste preferences.
            </p>

            <h2 style={{ fontSize: '1.8rem', color: colors.burgundy, margin: '2rem 0 1rem' }}>Pour-Over</h2>
            <div style={{
              width: '100%',
              height: '300px',
              background: `url(/images/espresso.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}></div>
            <p style={{ marginBottom: '1.5rem' }}>
              The pour-over method involves pouring hot water over coffee grounds in a filter. The water
              drains through the grounds and filter into a carafe or mug, creating a clean, flavorful brew.
              This method gives you complete control over brewing time and water distribution.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Best for:</strong> Coffee lovers who appreciate clarity and brightness in their cup.
              Pour-over brewing highlights the delicate, nuanced flavors in light and medium roasts.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Equipment needed:</strong> Pour-over dripper (Hario V60, Chemex, or Kalita Wave),
              paper filters, gooseneck kettle, scale.
            </p>

            <h2 style={{ fontSize: '1.8rem', color: colors.burgundy, margin: '2rem 0 1rem' }}>French Press</h2>
            <div style={{
              width: '100%',
              height: '300px',
              background: `url(/images/cortado.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}></div>
            <p style={{ marginBottom: '1.5rem' }}>
              The French press is an immersion brewing method where coffee grounds steep directly in hot
              water before being separated by a metal mesh filter. This results in a full-bodied cup with
              rich flavor and natural oils.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Best for:</strong> Those who enjoy a robust, full-bodied coffee with more texture.
              French press brings out the deep, rich notes in medium to dark roasts.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Equipment needed:</strong> French press, kettle, timer, coarse coffee grounds.
            </p>

            <h2 style={{ fontSize: '1.8rem', color: colors.burgundy, margin: '2rem 0 1rem' }}>Espresso</h2>
            <div style={{
              width: '100%',
              height: '300px',
              background: `url(/images/iced%20italian%20vanilla%20latte.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}></div>
            <p style={{ marginBottom: '1.5rem' }}>
              Espresso is a concentrated coffee brewed by forcing hot water through finely-ground coffee
              under high pressure. This method creates a small, intense shot with a layer of crema on top.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Best for:</strong> Coffee enthusiasts who enjoy intensity and concentration. Espresso
              serves as the foundation for many popular coffee drinks like lattes, cappuccinos, and Americanos.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Equipment needed:</strong> Espresso machine or moka pot, fine coffee grounds, tamper.
            </p>

            <h2 style={{ fontSize: '1.8rem', color: colors.burgundy, margin: '2rem 0 1rem' }}>Cold Brew</h2>
            <div style={{
              width: '100%',
              height: '300px',
              background: `url(/images/mandarin%20iced%20tea.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}></div>
            <p style={{ marginBottom: '1.5rem' }}>
              Cold brew is made by steeping coffee grounds in cold or room temperature water for an extended
              period (12-24 hours). This slow extraction creates a smooth, low-acid coffee concentrate that
              can be diluted with water or milk.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Best for:</strong> Hot summer days or those with sensitive stomachs who find traditional
              coffee too acidic. Cold brew's smooth, sweet profile makes it perfect for iced coffee drinks.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Equipment needed:</strong> Large jar or cold brew maker, coarse coffee grounds, filter.
            </p>

            <h2 style={{ fontSize: '1.8rem', color: colors.burgundy, margin: '2rem 0 1rem' }}>Finding Your Perfect Brew</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              The best brewing method depends on your personal taste preferences, time constraints, and
              the equipment you're willing to invest in. We recommend experimenting with different methods
              to discover what brings out the flavors you enjoy most.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              At Yuka Coffee, we use various brewing methods to highlight the unique characteristics of
              our carefully selected beans. Visit us to experience the difference each brewing technique
              makes and find your perfect cup!
            </p>

            <div style={{
              marginTop: '3rem',
              padding: '1.5rem',
              background: colors.taupe,
              borderRadius: '8px',
              fontSize: '1rem'
            }}>

            </div>
          </div>

          {/* Related Posts */}
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ fontSize: '2rem', color: colors.burgundy, marginBottom: '2rem' }}>Related Articles</h2>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {/* Related Post 1 */}
              <div style={{ width: 'calc(50% - 1rem)', minWidth: '300px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{
                  height: '150px',
                  background: `url(/images/espresso.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: colors.burgundy,
                    color: 'white',
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    marginBottom: '0.8rem'
                  }}>
                    Related Articles
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: colors.burgundy }}>
                    Understanding Coffee Bean Varieties
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: colors.taupe }}>May 3, 2025</p>
                </div>
              </div>

              {/* Related Post 2 */}
              <div style={{ width: 'calc(50% - 1rem)', minWidth: '300px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{
                  height: '150px',
                  background: `url(/images/mandarin%20iced%20tea.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: colors.orange,
                    color: 'white',
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    marginBottom: '0.8rem'
                  }}>
                    Recipes
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: colors.burgundy }}>
                    5 Cold Brew Recipes Perfect for Summer
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: colors.taupe }}>April 25, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Main component that manages the multi-page website
const YukaCoffeeWebsite = () => {
  const colors: Colors = {
    burgundy: '#6F0619',
    orange: '#FE8C01',
    cream: '#FFEECC',
    taupe: '#C8B19D',
    black: '#000000'
  };

  const [currentPage, setCurrentPage] = useState<string>('home');

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: colors.black, background: colors.cream, minHeight: '100vh' }}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} colors={colors} />

      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} colors={colors} />}
      {currentPage === 'about' && <AboutPage colors={colors} />}
      {currentPage === 'menu' && <MenuPage colors={colors} />}
      {currentPage === 'blog' && <BlogPage setCurrentPage={setCurrentPage} colors={colors} />}
      {currentPage === 'blogPost' && <BlogPostPage setCurrentPage={setCurrentPage} colors={colors} />}
      {currentPage === 'booking' && <BookingPage colors={colors} />}

      <Footer setCurrentPage={setCurrentPage} colors={colors} />
    </div>
  );
};

export default YukaCoffeeWebsite;